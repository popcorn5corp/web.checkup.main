import { useTableFilterStore } from '@/stores/modules/tableFilter'
import { toRefs, computed } from 'vue'

export function useTable() {
  function updateParams(type: string, item: SelectedType) {
    return (state.paramsData[type] = item)
  }

  const params = computed(() => updateParams())
  return {
    params
  }
}
