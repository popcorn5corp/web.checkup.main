import { useTableFilterStore } from '@/stores/modules/tableFilter'
import { watch, ref } from 'vue'

export function useTag() {
  const { filterList } = useTableFilterStore()

  const tags = ref<string[] | string>([])

  function update() {
    tags.value = Object.values(filterList)
      .map((list) => {
        const { type, selected } = list
        if (type === 'datepicker') return selected

        return Object.keys(selected).includes('label') ? selected.label : selected.map(getLabel)
      })
      .join()
      .split(',')
  }

  function getLabel({ label }: { label: string; value: string | number }) {
    return label
  }

  function close(item: { type: string; value: {} | string }) {
    const { type, value } = item
  }

  watch(filterList, (filterList) => update())

  return {
    tags,
    update,
    close
  }
}
