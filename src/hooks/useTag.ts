import { watch, ref } from 'vue'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import { type FilterType, FilterTypes } from '@/components/Table/types'

export function useTag() {
  const { filterList, setFilterList } = useTableFilterStore()

  const tags = ref<LabelValueOptions>([])

  function addTag() {
    tags.value = filterList
      .filter((filter) => filter.type !== FilterTypes.RADIO && filter.selectedItems?.length)
      .map((filter) => filter.selectedItems) as []
  }

  function removeTag(options: LabelValueOptions, type: FilterType | null) {
    filterList.map((filter) => {
      if (filter.type === FilterTypes.DATEPICKER || filter.type === FilterTypes.RANGEDATEPICKER) {
        type === filter.type && (filter.selectedItems = [])
      } else {
        filter.selectedItems = filter.selectedItems.filter(
          (item) => Object.entries(item).toString() !== Object.entries(options).toString()
        ) as []
      }
    })

    setFilterList(filterList)
  }

  function initTag() {
    filterList.forEach((filter) => (filter.selectedItems = []))
  }

  watch(filterList, () => addTag(), { immediate: true })

  return {
    tags,
    addTag,
    removeTag,
    initTag
  }
}
