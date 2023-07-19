import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { filterList } from '@/components/Table/mock'

import type { TableFilterState, SelectedType, OptionType } from '../interface'
import { useTable } from '@/hooks/useTable'

export const useTableFilterStore = defineStore('tableFilter', () => {
  // state
  const state = reactive<TableFilterState>({
    selectedData: {},
    filterList
  })

  // action
  function setSelectedFilterData(type: string, item: SelectedType | OptionType) {
    Object.values(state.filterList).forEach((list) => {
      list.type === type && (list.selected = item)
    })

    const { update } = useTable()

    update()
  }

  return {
    ...state,
    setSelectedFilterData
  }
})
