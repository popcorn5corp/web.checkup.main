import { cloneDeep } from 'lodash-es'
import { type ComputedRef, computed, ref, unref, watch } from 'vue'
import type { FilterFormItem, FilterList } from '@/components/filter-form'
import type { DynamicTableProps } from '../types'

export function useFilter(propsRef: ComputedRef<DynamicTableProps>) {
  const filterFormItems = ref<FilterFormItem[]>([])
  const cloneFilterFormItems = ref<FilterFormItem[]>([])
  const getFilterFormItems = computed(() => unref(filterFormItems))

  const getSelectedItemsCount = computed(
    () => unref(getFilterFormItems).filter((formItem) => formItem.selectedItems.length).length
  )
  let countFlag = 0

  watch(
    () => unref(propsRef),
    async ({ filterRequest, filters }) => {
      if (!countFlag) {
        let _filters: FilterList = []
        let _filterFormItems: FilterFormItem[] = []

        if (filters && filters.length) {
          _filters = filters
        }

        if (filterRequest) {
          try {
            const { data, success } = await filterRequest()

            if (success) {
              _filters = data.filters
            }
          } catch (error) {
            console.log(error)
          }
        }

        /**
         * @description 필터 영역 랜더링에 필요한 데이터 정의
         * - Radio일 경우, options중 첫번째 값을 기본 선택
         * - RangeDatePicker일 경우, start/end 모두 제거
         */
        _filterFormItems = unref(_filters)
          .sort((a, b) => a.order - b.order)
          .map((filter, index) => {
            const { type, options, selectedItems } = filter
            const _selectedItems =
              type === 'Radio' ? (options ? [options[0]] : []) : selectedItems || []
            const removeAll = type === 'RangeDatePicker'

            return {
              ...filter,
              index,
              open: true,
              options: options || [],
              selectedItems: _selectedItems,
              removeAll
            }
          })

        filterFormItems.value = _filterFormItems
        cloneFilterFormItems.value = cloneDeep(unref(filterFormItems))
        countFlag++
      }
    },
    {
      immediate: true
    }
  )

  function setFilterFormItem(filterFormItem: FilterFormItem) {
    const { index } = filterFormItem
    unref(filterFormItems)[index] = {
      ...filterFormItem
    }
  }

  // function getSelectedItemsCount() {
  //   return unref(filterFormItems).filter((formItem) => formItem.selectedItems.length).length
  // }

  function clearSelectedItems() {
    unref(filterFormItems).map((formItem) => {
      const { type, options } = formItem

      // Radio일 경우, Options의 첫번째 값을 기본선택
      const _selectedItems = type === 'Radio' ? [options[0]] : []
      formItem.selectedItems = _selectedItems
    })
  }

  function initFilterFormItems() {
    filterFormItems.value = cloneDeep(unref(cloneFilterFormItems))
  }

  return {
    getFilterFormItems,
    getSelectedItemsCount,
    setFilterFormItem,
    clearSelectedItems,
    initFilterFormItems
  }
}
