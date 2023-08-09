import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useTable } from '@/components/Table/hooks/useTable'
import type { Filter } from '@/components/Table/interface'
import { filterList } from '@/components/Table/mock'
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
