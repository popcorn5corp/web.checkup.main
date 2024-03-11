import { Util } from '@/utils'
import { cloneDeep } from 'lodash-es'
import { type ComputedRef, computed, reactive, toRefs, unref, watch } from 'vue'
import type { DynamicTableInstance } from '@/components/dynamic-table/hooks/useDynamicTableContext'
import { FILTER_UI } from '@/components/filter-form'
import type { TablePagination, TableProps, TableSorter } from '../types'
import { defaultPaginaton } from '../types'
import { ErrorMessage, TableError } from './error'

interface State {
  dataSource: any[]
  cardData: any[]
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

export const useTable = (
  propsRef: ComputedRef<TableProps>,
  context: DynamicTableInstance,
  { setLoading }: ActionType
) => {
  const state = reactive({
    ...defaultState()
  })
  function defaultState(): State {
    return {
      dataSource: [],
      cardData: [],
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

  const { current, pageSize } = toRefs(state.pagination)
  const getDataSource = computed(() => unref(propsRef).dataSource || state.dataSource)
  const getCardData = computed(() => state.cardData)
  const isSorting = computed(() => state.sorter.length)
  const paginationParam = computed(() => ({ page: unref(current) - 1, size: unref(pageSize) }))
  const getPagination = computed(() => {
    if (!unref(propsRef).options?.isPagination) return false
    return state.pagination
  })

  const sorterParam = computed(() => {
    let param = ''
    state.sorter.map((r, i) => {
      param = param + `${i !== 0 ? ',' : ''}` + `${r.order === 'descend' ? '-' : ''}${r.columnKey}`
    })

    return { sort: param === '' ? undefined : param }
  })

  const rowSelection = computed<TableProps['rowSelection']>(() => {
    return {
      selectedRowKeys: state.selectedRowKeys,
      onChange: (changableRowKeys: Key[]) => {
        state.selectedRowKeys = changableRowKeys
      },
      hideDefaultSelections: true
    }
  })

  /**
   * @description 테이블 리스트 조회
   */
  async function fetchDataSource(options?: {
    isReset?: boolean
    param?: { searchWord?: string }
    filterParam?: Recordable
  }): Promise<void> {
    setLoading(true)

    const {
      rowKey,
      dataRequest,
      dataSource,
      options: propsOptions,
      dataCallback,
      contentCallback,
      cardContentCallback
    } = unref(propsRef)

    let _dataSource = []
    let _cardData = []
    let _total = 0

    if (!dataRequest) {
      if (dataSource) {
        _dataSource = dataSource
        _cardData = dataSource
        _total = dataSource.length
      }
    } else {
      const filterParam = options?.filterParam
      filterParam && (state.filterParam = filterParam)

      let requestParam: State['requestParam'] = {
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

        if (success && dataCallback) {
          const dcResult = dataCallback(data)

          if (dcResult === undefined) {
            throw new TableError(ErrorMessage.DATACALLBACK.NO_RETURN_VALUE)
          }

          const { content, totalElements } = dcResult

          if (!content) {
            throw new TableError(ErrorMessage.DATACALLBACK.NO_CONTENT)
          }

          content.map((record: Recordable, i: number) => {
            record['index'] = i
            record['rowKey'] = record[rowKey]
          })

          _dataSource = contentCallback ? contentCallback(content) : content
          _cardData = cardContentCallback ? cardContentCallback(content) : content
          _total = totalElements
          state.pagination.total = totalElements
        }
      } catch (error) {
        if (error instanceof TableError) {
          console.warn(error.message)
        } else {
          console.log(error)
          throw error
        }
      }
    }

    state.dataSource = _dataSource
    state.cardData = _cardData
    state.total = _total
    setLoading(false)
  }

  /**
   * @description DynamicTable 필터 정보를 통해 Request Paramter 생성
   */
  watch(
    () => context?.getFilterFormItems(),
    async (filterFormItems) => {
      if (context) {
        const activeFilter = unref(context.getContextValues).activeFilter

        if (activeFilter && filterFormItems.length) {
          const _filterFormItems = cloneDeep(filterFormItems)
          const defaultParam = {
            page: 0,
            size: 10,
            searchWord: ''
          }

          type ParamValue = string | number | boolean
          const filterParam: {
            [key: string]: ParamValue | Array<ParamValue>
          } = {
            ...defaultParam
          }

          _filterFormItems.map((formItem) => {
            const { type, key, selectedItems } = formItem

            // Checkbox 타입일 경우에만 search 조건이 여러개가 가능하기때문에 Array로 세팅
            if (type === FILTER_UI.CHECKBOX) {
              key.map((k) => {
                filterParam[k] = []

                selectedItems?.map((item) => {
                  ;(filterParam[k] as Array<ParamValue>).push(item.value)
                })
              })

              return
            }

            key.map((k, i) => {
              selectedItems.length && (filterParam[k] = selectedItems[i].value)
            })
          })

          filterParam && (await fetchDataSource({ isReset: false, filterParam }))
        }
      }
    },
    { immediate: true, deep: true }
  )

  /**
   * @description 테이블 변경에 대한 Event
   */
  const changeTable: TableProps['onChange'] = async (pagination, filters, sorter, extra) => {
    const { pageSize, current } = pagination

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

  function getRecordNo(index: number) {
    const { pageSize, current } = state.pagination
    return index + 1 + pageSize * (current - 1)
  }

  async function setPagination(current: number, pageSize: number) {
    state.pagination = {
      ...state.pagination,
      pageSize: pageSize as number,
      current: current as number
    }

    await fetchDataSource()
  }

  function initTableState() {
    state.dataSource = []
    state.cardData = []
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

  return {
    ...toRefs(state),
    getDataSource,
    getCardData,
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
