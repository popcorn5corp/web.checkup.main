import { defineStore } from 'pinia'
import { reactive } from 'vue'
// import { useTable } from '@/components/table/hooks/useTable'
import type { Filter } from '@/components/dynamic-table/src/components/FilterType/types'
import { filterList } from '@/components/dynamic-table/src/components/mock'
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

  function setFilterList(newFilterList: Filter[]) {
    state.filterList = newFilterList
  }

  return {
    ...state,
    setSelectedFilterData,
    setFilterList
  }
})
