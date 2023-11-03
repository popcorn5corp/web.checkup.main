import { type ComputedRef, computed, ref, unref, watch } from 'vue'
import type { FilterFormItem } from '@/components/filter-form'
import type { DynamicTableProps } from '../types'
import { useDynamicTableContext } from './useDynamicTableContext'

export function useFilter(propsRef: ComputedRef<DynamicTableProps>) {
  const filterFormItems = ref<FilterFormItem[]>([])

  // FilterForm 구성하기 위한 Filter 목록 생성
  // const getFilterFormItems = computed<FilterFormItem[]>(() => {
  //   const { filters } = unref(propsRef)
  //   return filters?.map((filter, index) => ({
  //     ...filter,
  //     index,
  //     open: true,
  //     selectedItems: []
  //   }))
  // })

  function generateFilterFormItems() {
    const { filters } = unref(propsRef)
    filterFormItems.value = filters?.map((filter, index) => ({
      ...filter,
      index,
      open: true,
      selectedItems: []
    }))
  }

  return {
    filterFormItems,
    generateFilterFormItems
  }
}
