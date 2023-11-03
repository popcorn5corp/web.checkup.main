import { type ComputedRef, ref, unref, watch } from 'vue'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import { FILTER_UI, type FilterUI } from '@/components/filter-form'
import type { DynamicTableContextValues } from '../types'
import { useDynamicTableContext } from './useDynamicTableContext'

export function useTag(contextValuesRef: ComputedRef<DynamicTableContextValues>) {
  const dynamicTable = useDynamicTableContext()
  const tagList = ref([])

  function addTag() {}

  function removeTag() {
    const filterFormItems = unref(dynamicTable.getContextValues).filterFormItems
  }
}

// export function useTag() {
//   const { filterList, setFilterList } = useTableFilterStore()
//   const dynamicTable = useDynamicTableContext()

//   watch(
//     () => unref(dynamicTable.getContextValues).filters,
//     () => {
//       console.log('ddddd')
//     },
//     {
//       deep: true
//     }
//   )

//   const tags = ref<LabelValueOptions>([])

//   function addTag() {
//     tags.value = filterList
//       .filter((filter) => filter.type !== FILTER_UI.RADIO && filter.selectedItems?.length)
//       .map((filter) => filter.selectedItems) as []
//   }

//   function removeTag(options: LabelValueOptions, type: FilterUI | null) {
//     filterList.map((filter) => {
//       if (filter.type === FILTER_UI.DATE_PICKER || filter.type === FILTER_UI.RANGE_DATE_PICKER) {
//         type === filter.type && (filter.selectedItems = [])
//       } else {
//         filter.selectedItems = filter.selectedItems.filter(
//           (item: any) => Object.entries(item).toString() !== Object.entries(options).toString()
//         ) as []
//       }
//     })

//     setFilterList(filterList)
//   }

//   function initTag() {
//     filterList.forEach((filter) => (filter.selectedItems = []))
//   }

//   watch(filterList, () => addTag(), { immediate: true })

//   return {
//     tags,
//     addTag,
//     removeTag,
//     initTag
//   }
// }
