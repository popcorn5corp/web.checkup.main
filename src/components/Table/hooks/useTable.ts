import { computed, reactive, toRefs, watch } from 'vue'
import { isArray, isEmpty } from '@/utils/is'
import type { TablePagination, TableProps, TableSorter } from '../types'
import { defaultPaginaton } from '../types'

interface State {
  dataSource: any[]
  pagination: TablePagination
  total: number
  requestParam: Object
  loading: boolean
  selectedRowKeys: Key[]
  sorter: Array<{
    columnKey: string
    order: 'descend' | 'ascend'
  }>
  searchWord: string
}

export const useTable = (
  request?: TableProps['dataRequest'],
  dataCallback?: TableProps['dataCallback'],
  dataSource?: TableProps['dataSource'],
  initParam: TableProps['initParam'] = {
    size: 0,
    page: 1
  },
  isPagination: boolean = true,
  pagination?: TableProps['pagination']
) => {
  const state = reactive<State>({
    dataSource: [],
    total: 0,
    requestParam: {},
    loading: false,
    selectedRowKeys: [],
    pagination: {
      ...defaultPaginaton,
      ...pagination
    },
    sorter: [],
    searchWord: ''
  })

  const isSorting = computed(() => state.sorter.length)
  const paginationParam = computed({
    get: () => {
      return {
        page: state.pagination.current - 1,
        size: state.pagination.pageSize
      }
    },
    set: () => {}
  })

  const sorterParam = computed({
    get: () => {
      let param = ''
      state.sorter.map((r, i) => {
        param =
          param + `${i !== 0 ? ',' : ''}` + `${r.order === 'descend' ? '-' : ''}${r.columnKey}`
      })

      return {
        sort: param === '' ? undefined : param
      }
    },
    set: () => {}
  })

  const getDataSource = async (options?: {
    isReset?: boolean
    param?: { searchWord?: string }
  }): Promise<void> => {
    let _dataSource = []
    let _total = 0

    if (!request) {
      if (dataSource) {
        _dataSource = dataSource
        _total = dataSource.length
      }
    } else {
      state.loading = true
      let requestParam: State['requestParam'] = {}

      if (!options?.isReset) {
        requestParam = {
          ...initParam,
          ...state.requestParam,
          searchWord: state.searchWord
        }

        if (options?.param!.searchWord || options?.param!.searchWord === '') {
          requestParam = {
            ...requestParam,
            searchWord: options.param.searchWord
          }

          state.searchWord = options.param.searchWord
          state.pagination.current = defaultPaginaton.current
        }
      } else {
        requestParam = {
          ...initParam
        }

        state.pagination = defaultPaginaton
        state.sorter = []
      }

      isPagination && Object.assign(requestParam, paginationParam.value)
      isSorting.value && Object.assign(requestParam, sorterParam.value)

      try {
        const { data, success } = await request(requestParam)

        if (success) {
          const {
            posts: { content, totalElements }
          } = data

          // key 설정
          content.map((record: Recordable, i: number) => {
            record['key'] = i
          })
          _dataSource = dataCallback ? dataCallback(content) : content
          state.pagination.total = totalElements
          _total = totalElements
        }
      } catch (e) {
        console.log(e)
      }
    }

    state.dataSource = _dataSource
    state.total = _total

    setTimeout(() => {
      state.loading = false
    }, 300)
  }

  const changeTable: TableProps['onChange'] = (pagination, filters, sorter, extra) => {
    const { pageSize, current } = pagination
    // // 페이지 사이즈 변경 시, 첫 페이지로 이동
    // // const isChangePageSize = tablePagination.value.pageSize !== pageSize

    // tablePagination.value.pageSize = pageSize
    // tablePagination.value.current = isChangePageSize ? 1 : current
    state.pagination = {
      ...state.pagination,
      pageSize: pageSize as number,
      current: current as number
    }

    // case: '{}' / column: undefined
    if (!isEmpty(sorter)) {
      state.sorter = isArray(sorter) ? sorter : !(sorter as TableSorter).column ? [] : [sorter]
    }

    getDataSource()
  }

  const getRecordNo = (index: number) => {
    if (!isPagination) return index + 1

    const { pageSize, current } = state.pagination
    // if (pageSize && current) {
    return index + 1 + pageSize * (current - 1)
    // }
  }

  const rowSelection = computed<TableProps['rowSelection']>(() => {
    return {
      selectedRowKeys: state.selectedRowKeys,
      onChange: (changableRowKeys: Key[]) => {
        state.selectedRowKeys = changableRowKeys
      },
      hideDefaultSelections: true
    }
  })

  return {
    ...toRefs(state),
    getDataSource,
    changeTable,
    getRecordNo,
    rowSelection
  }
}
