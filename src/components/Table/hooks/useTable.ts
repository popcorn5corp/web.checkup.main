import { computed, reactive, toRefs, watch } from 'vue'
import type { DynamicTableProps, TablePagination } from '../types'

interface State {
  dataSource: Object[]
  pagination: TablePagination
  total: number
  requestParam: Object
  isLoading: boolean
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
  request?: DynamicTableProps['request'],
  initParam: DynamicTableProps['initParam'] = {
    size: 0,
    page: 1
  },
  isPagination: boolean = true,
  dataCallback?: DynamicTableProps['dataCallback']
) => {
  const state = reactive<State>({
    dataSource: [],
    pagination: {
      ...getDefaultPagination(),
      pageSize: initParam.size,
      current: initParam.page
    },
    total: 0,
    requestParam: {},
    isLoading: false
  })

  const paginationParam = computed({
    get: () => {
      return {
        page: state.pagination.current - 1,
        size: state.pagination.pageSize
      }
    },
    set: (newVal) => {
      console.log(newVal)
    }
  })

  const getDataSource = async () => {
    if (!request) return

    try {
      state.isLoading = true
      let dataSource = []
      let requestParam = {
        ...state.requestParam,
        ...initParam
      }

      if (isPagination) {
        requestParam = {
          ...requestParam,
          ...paginationParam.value
        }
      }

      const {
        posts: { content, totalElements }
      } = await request(requestParam)

      if (dataCallback) {
        dataSource = dataCallback(content)
      }

      state.dataSource = content
      state.pagination.total = totalElements
    } catch (e) {
      console.log(e)
    }

    state.isLoading = false
  }

  // watch(refetch, () => {
  //   console.log('asdasd')
  // })

  const changeTable = (param: any) => {
    const { pageSize, current } = param
    // 페이지 사이즈 변경 시, 첫 페이지로 이동
    // const isChangePageSize = tablePagination.value.pageSize !== pageSize

    // tablePagination.value.pageSize = pageSize
    // tablePagination.value.current = isChangePageSize ? 1 : current
    state.pagination = {
      ...state.pagination,
      pageSize,
      current
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

  const refetch = () => {
    getDataSource()
  }

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

  return {
    ...toRefs(state),
    getDataSource,
    changeTable,
    getRecordNo,
    refetch
  }
}
