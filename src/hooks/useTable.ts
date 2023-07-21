import type { Filter } from '@/components/Table/types'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import { ref, watch } from 'vue'

export function useTable() {
  const { filterList } = useTableFilterStore()
  const params = ref<string>('')
  const divide = '&'

  function addParams() {
    params.value = ''
    params.value = filterList
      .map((filter) => `${filter.type}=${getParamsValue(filter)}${divide}`)
      .join('')
      .slice(0, -1)
  }

  function getValue({ value }: { label: string; value: string | number }) {
    return value
  }

  function getParamsValue(filter: Filter) {
    return filter.selectedItems.map(getValue)
  }

  watch(filterList, () => addParams())

  return {
    params,
    addParams
  }
}
