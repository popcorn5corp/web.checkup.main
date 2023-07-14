import { useTableFilterStore } from '@/stores/modules/tableFilter'
import { toRefs, computed } from 'vue'

export function useTag() {
  const { selectedFilterData: items } = toRefs(useTableFilterStore())

  function updateTag() {
    return Object.values(items.value)
      .map((item) => {
        return Object.keys(item).includes('label') ? item.label : item
      })
      .join()
      .split(',')
  }

  function remove(e) {
    updateTag()
  }

  const tags = computed(() => updateTag())

  return {
    tags,
    remove,
    updateTag
  }
}
