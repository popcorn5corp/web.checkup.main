import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
// import { useTable } from '@/components/table/hooks/useTable'
import type { FilterFormItem } from '@/components/filter-form'
import { filterList } from '@/components/filter-form/types/mock'
import type { TableFilterState } from '../interface'

export const useTableFilterStore = defineStore('tableFilter', () => {
  // state
  const state = reactive<TableFilterState>({
    selectedData: {},
    filterList
  })

  // action
  function setSelectedFilterData(type: string, options: LabelValueType[]) {
    Object.values(state.filterList).forEach((filter) => {
      filter.type === type && (filter.selectedItems = options as [])
    })

    // const { addParams } = useTable()
    // addParams()
  }

  function setFilterList(newFilterList: FilterFormItem[]) {
    state.filterList = newFilterList
  }

  return {
    ...state,
    setSelectedFilterData,
    setFilterList
  }
})
