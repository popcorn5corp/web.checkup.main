import { Util } from '@/utils'
import { type ComputedRef, computed, reactive, toRefs, unref, watch } from 'vue'
import type { TablePagination, TableProps, TableSorter } from '../types'
import { defaultPaginaton } from '../types'

interface State {
  dataSource: any[]
  pagination: TablePagination
  total: number
  requestParam: Object
  selectedRowKeys: Key[]
  sorter: Array<{
    columnKey: string
    order: 'descend' | 'ascend'
  }>
  searchWord: string
}

interface ActionType {
  setLoading: (loading: boolean) => void
}

export const useTable = (propsRef: ComputedRef<TableProps>, { setLoading }: ActionType) => {
  const state = reactive<State>({
    dataSource: [],
    total: 0,
    requestParam: {},
    selectedRowKeys: [],
    pagination: {
      ...defaultPaginaton,
      ...unref(propsRef).pagination
    },
    sorter: [],
    searchWord: ''
  })

  const isSorting = computed(() => state.sorter.length)
  const paginationParam = computed(() => {
    return {
      page: state.pagination.current - 1,
      size: state.pagination.pageSize
    }
  })

  const sorterParam = computed(() => {
    let param = ''
    state.sorter.map((r, i) => {
      param = param + `${i !== 0 ? ',' : ''}` + `${r.order === 'descend' ? '-' : ''}${r.columnKey}`
    })

    return {
      sort: param === '' ? undefined : param
    }
  })

  const getDataSource = async (options?: {
    isReset?: boolean
    param?: { searchWord?: string }
  }): Promise<void> => {
    const {
      dataRequest,
      dataSource,
      initParam,
      options: propsOptions,
      dataCallback
    } = unref(propsRef)

    let _dataSource = []
    let _total = 0

    if (!dataRequest) {
      if (dataSource) {
        _dataSource = dataSource
        _total = dataSource.length
      }
    } else {
      setLoading(true)
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

      propsOptions?.isPagination && Object.assign(requestParam, paginationParam.value)
      isSorting.value && Object.assign(requestParam, sorterParam.value)

      try {
        const { data, success } = await dataRequest(requestParam)

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
      setLoading(false)
    }, 300)
  }

  const changeTable: TableProps['onChange'] = (pagination, filters, sorter, extra) => {
    const { pageSize, current } = pagination
    console.log('change', pageSize, current)
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
    if (!Util.Is.isEmpty(sorter)) {
      // @ts-ignore
      state.sorter = Util.Is.isArray(sorter)
        ? sorter
        : // @ts-ignore
        !(sorter as TableSorter).column
        ? []
        : [sorter]
    }

    getDataSource()
  }

  const getRecordNo = (index: number) => {
    if (unref(propsRef).options?.isPagination) return index + 1

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
