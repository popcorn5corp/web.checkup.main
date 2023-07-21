import { watch, ref } from 'vue'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import type { LabelInValueType } from 'ant-design-vue/es/vc-select/Select'
import { FilterTypes, type FilterType } from '@/components/Table/types'

export function useTag() {
  const { filterList, setFilterList } = useTableFilterStore()

  const tags = ref<[]>([])

  function addTag() {
    tags.value = Object.values(filterList).map((filter) => filter.selectedItems) as []
  }

  function removeTag(options: LabelInValueType, type: FilterType) {
    filterList.map((filter) => {
      if (type && filter.type === FilterTypes.DATEPICKER) {
        return (filter.selectedItems = [])
      } else {
        return (filter.selectedItems = filter.selectedItems.filter(
          (item) => Object.entries(item).toString() !== Object.entries(options).toString()
        ))
      }
    })
    setFilterList(filterList)
  }

  watch(filterList, (filterList) => addTag())

  return {
    tags,
    addTag,
    removeTag
  }
}
