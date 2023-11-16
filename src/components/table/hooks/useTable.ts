import { Util } from '@/utils'
import { type ComputedRef, computed, reactive, ref, toRefs, unref, watch } from 'vue'
import type { TablePagination, TableProps, TableSorter } from '../types'
import { defaultPaginaton } from '../types'

interface State {
  dataSource: any[]
  pagination: TablePagination
  total: number
  requestParam: Recordable
  filterParam: Recordable
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
  const state = reactive({
    ...defaultState()
  })
  function defaultState(): State {
    return {
      dataSource: [],
      total: 0,
      requestParam: {},
      filterParam: {},
      selectedRowKeys: [],
      pagination: {
        ...defaultPaginaton,
        ...unref(propsRef).pagination
      },
      sorter: [],
      searchWord: ''
    }
  }

  const getDataSource = computed(() => state.dataSource)

  function initTableState() {
    state.dataSource = []
    state.total = 0
    state.requestParam = {}
    state.filterParam = {}
    state.selectedRowKeys = []
    state.pagination = {
      ...defaultPaginaton,
      ...unref(propsRef).pagination
    }
    state.sorter = []
    state.searchWord = ''
  }

  function initDataSource() {
    state.dataSource = []
  }

  function initCardViewChecked() {
    state.dataSource = getDataSource.value.map((r) => {
      return {
        ...r,
        checked: false
      }
    })
  }

  const getPagination = computed(() => {
    if (!unref(propsRef).options?.isPagination) return false
    return state.pagination
  })

  async function setPagination(current: number, pageSize: number) {
    state.pagination = {
      ...state.pagination,
      pageSize: pageSize as number,
      current: current as number
    }

    await fetchDataSource()
  }

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

  const filterParam = computed(() => {
    return {}
  })

  const isReset = ref(false)
  const searchWord = ref('')

  // const requestParam = computed(() => {
  //   const { initParam, options } = unref(propsRef)
  //   console.log('requestParam :: ', requestParam, options)

  //   const param: State['requestParam'] = {
  //     ...initParam,
  //     searchWord: unref(searchWord)
  //   }

  //   if (!unref(isReset)) {
  //     state.pagination.current = defaultPaginaton.current
  //   } else {
  //     state.pagination = {
  //       ...defaultPaginaton
  //     }
  //     state.sorter = []
  //     searchWord.value = ''
  //   }

  //   options?.isPagination && Object.assign(param, paginationParam.value)
  //   unref(isSorting) && Object.assign(param, sorterParam.value)

  //   console.log('param :: ', param)

  //   return param
  // })

  const fetchDataSource = async (options?: {
    isReset?: boolean
    param?: { searchWord?: string }
    filterParam?: Recordable
  }): Promise<void> => {
    const {
      rowKey,
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
      const filterParam = options?.filterParam
      filterParam && (state.filterParam = filterParam)

      let requestParam: State['requestParam'] = {
        // ...initParam,
        ...state.filterParam
      }

      // Reload일 경우
      if (options?.isReset) {
        state.sorter = []
        state.pagination = {
          ...defaultPaginaton
        }

        state.searchWord = ''
      } else {
        requestParam = {
          // ...initParam,
          // ...state.requestParam,
          ...state.filterParam,
          searchWord: state.searchWord
        }

        // options 정보로 넘어온 searchWord 존재할 경우
        if (options?.param?.searchWord || options?.param?.searchWord === '') {
          state.searchWord = options.param.searchWord
          state.pagination.current = defaultPaginaton.current
          requestParam.searchWord = state.searchWord
        }
      }

      propsOptions?.isPagination && Object.assign(requestParam, unref(paginationParam))
      unref(isSorting) && Object.assign(requestParam, unref(sorterParam))

      try {
        const { data, success } = await dataRequest(requestParam)

        if (success) {
          const {
            posts: { content, totalElements }
          } = data

          // key 설정
          content.map((record: Recordable, i: number) => {
            record['index'] = i
            record['rowKey'] = record[rowKey]
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

  const changeTable: TableProps['onChange'] = async (pagination, filters, sorter, extra) => {
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
    if (!Util.Is.isEmpty(sorter)) {
      // @ts-ignore
      state.sorter = Util.Is.isArray(sorter)
        ? sorter
        : // @ts-ignore
        !(sorter as TableSorter).column
        ? []
        : [sorter]
    }

    await fetchDataSource()
  }

  const getRecordNo = (index: number) => {
    // if (unref(propsRef).options?.isPagination) return index + 1

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
    initTableState,
    initDataSource,
    fetchDataSource,
    changeTable,
    getRecordNo,
    rowSelection,
    setPagination,
    initCardViewChecked,
    getPagination
  }
}
