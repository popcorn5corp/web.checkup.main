import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { filterList } from '@/components/Table/mock'
import { useTable } from '@/hooks/useTable'

import type { LabelInValueType } from 'ant-design-vue/es/vc-select/Select'
import type { TableFilterState } from '../interface'
import type { Filter } from '@/components/Table/types'

export const useTableFilterStore = defineStore('tableFilter', () => {
  // state
  const state = reactive<TableFilterState>({
    selectedData: {},
    filterList
  })

  // action
  function setSelectedFilterData(type: string, options: LabelInValueType[]) {
    Object.values(state.filterList).forEach((filter) => {
      filter.type === type && (filter.selectedItems = options as [])
    })
    const { addParams } = useTable()

    addParams()
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
