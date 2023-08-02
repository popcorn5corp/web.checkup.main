import { computed, reactive, toRefs } from 'vue'
import type { DynamicTableProps, TablePagination, TableSorter } from '../types'
import type { TableCurrentDataSource, TableRowSelection } from 'ant-design-vue/es/table/interface'
import type { TableFilterState } from '@/stores/interface'
import { isArray, isEmpty } from '@/utils/is'

interface State {
  dataSource: any[]
  pagination: TablePagination
  total: number
  requestParam: Object
  isLoading: boolean
  selectedRowKeys: Key[]
  sorter: Array<{
    columnKey: string
    order: 'descend' | 'ascend'
  }>
  searchWord: string
}

function getDefaultPagination(): TablePagination {
  return {
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    position: ['bottomRight'],
    pageSizeOptions: ['10', '30', '50']
  }
}

export const useTable = (
  request?: DynamicTableProps['dataRequest'],
  initParam: DynamicTableProps['initParam'] = {
    size: 0,
    page: 1
  },
  isPagination: boolean = true,
  dataCallback?: DynamicTableProps['dataCallback']
) => {
  const state = reactive<State>({
    dataSource: [],
    total: 0,
    requestParam: {},
    isLoading: false,
    selectedRowKeys: [],
    pagination: {
      ...getDefaultPagination(),
      pageSize: initParam.size,
      current: initParam.page
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
    set: (newVal) => {}
  })

  // TODO
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
    set: (newVal) => {}
  })

  const getDataSource = async (options?: {
    isReset?: boolean
    param?: { searchWord?: string }
  }): Promise<void> => {
    if (!request) return

    try {
      state.isLoading = true
      let dataSource = []
      let requestParam: State['requestParam'] = {}

      if (!options?.isReset) {
        requestParam = {
          ...initParam,
          ...state.requestParam,
          searchWord: state.searchWord
        }

        // TODO
        if (options?.param!.searchWord || options?.param!.searchWord === '') {
          requestParam = {
            ...requestParam,
            searchWord: options.param.searchWord
          }

          state.searchWord = options.param.searchWord
          state.pagination.current = getDefaultPagination().current
        }
      } else {
        requestParam = {
          ...initParam
        }

        state.pagination = getDefaultPagination()
        state.sorter = []
      }

      isPagination && Object.assign(requestParam, paginationParam.value)
      isSorting && Object.assign(requestParam, sorterParam.value)

      const {
        posts: { content, totalElements }
      } = await request(requestParam)

      // index 설정
      content.map((record: Recordable, i: number) => {
        record['key'] = i
      })

      if (dataCallback) {
        dataSource = dataCallback(content)
      }

      state.dataSource = content
      state.pagination.total = totalElements
    } catch (e) {
      console.log(e)
    }

    setTimeout(() => {
      state.isLoading = false
    }, 300)
  }

  const changeTable = (
    pagination: TablePagination,
    filter: TableFilterState,
    sorter: TableSorter | TableSorter[],
    extra: TableCurrentDataSource
  ) => {
    const { pageSize, current } = pagination
    // // 페이지 사이즈 변경 시, 첫 페이지로 이동
    // // const isChangePageSize = tablePagination.value.pageSize !== pageSize

    // tablePagination.value.pageSize = pageSize
    // tablePagination.value.current = isChangePageSize ? 1 : current
    state.pagination = {
      ...state.pagination,
      pageSize,
      current
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
    if (pageSize && current) {
      return index + 1 + pageSize * (current - 1)
    }
  }

  const rowSelection = computed<TableRowSelection>(() => {
    return {
      selectedRowKeys: state.selectedRowKeys,
      onChange: (changableRowKeys: Key[]) => {
        console.log('selectedRowKeys changed: ', changableRowKeys)
        state.selectedRowKeys = changableRowKeys
      },
      hideDefaultSelections: true
    }
  })

  // /**
  //  * 테이블 Change 이벤트
  //  * @param {{total: number, current: number, pageSize: number, showSizeChanger: boolean, position: string[], pageSizeOptions: string[]}} event
  //  */
  // const onChange = (event: { pageSize: number; current: number }) => {
  //   const { pageSize, current } = event
  //   // 페이지 사이즈 변경 시, 첫 페이지로 이동
  //   const isChangePageSize = tablePagination.value.pageSize !== pageSize

  //   tablePagination.value.pageSize = pageSize
  //   tablePagination.value.current = isChangePageSize ? 1 : current

  //   emits('change', {
  //     ...event,
  //     page: isChangePageSize ? 1 : current,
  //     size: pageSize
  //   })

  //   isTableChangedFlag = true
  // }

  // const handleSearch = (selectedKeys: string[], dataIndex: string, confirm: () => void) => {
  //   emits('search', {
  //     key: dataIndex,
  //     value: selectedKeys[0]
  //   })
  //   confirm()
  // }

  // const handleReset = (selectedKeys: string[], dataIndex: string, clearFilters: Function) => {
  //   clearFilters({ confirm: true })
  //   emits('search', {
  //     key: dataIndex,
  //     value: selectedKeys[0]
  //   })
  // }

  // watch(
  //   () => dataSource?.value,
  //   () => {
  //     // pagination 사용하는 경우
  //     if (options.value.isPagination) {
  //       // 검색조건 변경일 경우, current 초기화
  //       if (isTableChangedFlag) {
  //         isTableChangedFlag = false
  //       } else {
  //         tablePagination.value.current = 1
  //       }
  //     }
  //   }
  // )

  return {
    ...toRefs(state),
    getDataSource,
    changeTable,
    getRecordNo,
    rowSelection
  }
}
