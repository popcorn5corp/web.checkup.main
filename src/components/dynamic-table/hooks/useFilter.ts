import { cloneDeep, filter } from 'lodash-es'
import { type ComputedRef, computed, ref, unref, watch } from 'vue'
import type { FilterFormItem, FilterList } from '@/components/filter-form'
import type { FilterOption } from '@/components/filter-form/types'
import type { DynamicTableProps } from '../types'

export function useFilter(propsRef: ComputedRef<DynamicTableProps>) {
  const filterFormItems = ref<FilterFormItem[]>([])
  const cloneFilterFormItems = ref<FilterFormItem[]>([])
  const innerFilters = ref<FilterList>([])

  // Getter: FilterForm을 그리기 위한 정보
  const getFilterFormItems = computed(() => unref(filterFormItems))

  watch(
    () => unref(propsRef),
    async ({ filterRequest, filters }) => {
      innerFilters.value = filters || []

      if (filterRequest) {
        const { data, success } = await filterRequest()

        if (success) {
          innerFilters.value = data.filters
        }
      }

      filterFormItems.value = unref(innerFilters).map((filter, index) => {
        const selectedItems =
          filter.type === 'Radio'
            ? filter.options
              ? [filter.options[0]]
              : []
            : filter.selectedItems || []

        return {
          ...filter,
          index,
          open: true,
          options: filter.options || [],
          selectedItems
        }
      })

      cloneFilterFormItems.value = cloneDeep(unref(filterFormItems))
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

  function clearSelectedItems() {
    unref(filterFormItems).map((formItem) => {
      const { type, options, selectedItems } = formItem

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
    setFilterFormItem,
    clearSelectedItems,
    initFilterFormItems
  }
}
