import { useTableFilterStore } from '@/stores/modules/tableFilter'
import { ref, watch } from 'vue'

export function useTable() {
  const { filterList } = useTableFilterStore()
  const requestParams = ref<{ [key: string]: any }>({})

  function addParams() {
    filterList.map((filter) => {
      const { type, selectedItems } = filter
      requestParams[type] = selectedItems
    })
  }

  watch(filterList, () => addParams())

  return {
    addParams
  }
}
