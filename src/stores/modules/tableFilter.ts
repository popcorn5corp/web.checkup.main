import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { filterList } from '@/components/Table/mock'
import type { TableFilterState, SelectedType, OptionType } from '../interface'

export const useTableFilterStore = defineStore('tableFilter', () => {
  // state
  const state = reactive<TableFilterState>({
    selectedFilterData: {},
    filterList
  })

  // action
  function setSelectedFilterData(type: string, item: SelectedType | OptionType) {
    Object.values(filterList).forEach(({ type, selected }) => {
      state.selectedFilterData[type] = selected
    })
  }

  return {
    ...state,
    setSelectedFilterData
  }
})
