import type { Filter } from '@/components/Table/types'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import { ref, watch } from 'vue'

export function useTable() {
  const { filterList } = useTableFilterStore()
  const params = ref<string>('')
  const divide = '&'

  function update() {
    params.value = ''
    params.value = filterList
      .map((list) => `${list.type}=${setRequestParmas(list)}${divide}`)
      .join('')
      .slice(0, -1)
  }

  function getValue({ value }: { label: string; value: string | number }) {
    return value
  }

  function setRequestParmas(list: Filter) {
    return Object.keys(list.selected).includes('value')
      ? list.selected.value
      : list.selected.map(getValue)
  }

  watch(filterList, (filterList) => update())

  return {
    params,
    update
  }
}
