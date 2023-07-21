<script lang="ts" setup name="FilterDatepicker">
import { toRefs, ref, watch } from 'vue'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import { FilterTypes, type Filter } from '../../types'

import type { Dayjs } from 'dayjs'

const { setSelectedFilterData } = useTableFilterStore()

const props = defineProps({
  item: {
    type: Object as PropType<Filter>,
    default: () => {}
  }
})

const { type, selectedItems } = toRefs(props.item)
const dates = ref([])

const onRangeChange = (
  value: [Dayjs, Dayjs] | [string, string],
  dateString: [string, string]
): void => {
  const options = dateString.map((date) => {
    return { label: date, value: date, type: FilterTypes.DATEPICKER }
  })

  setSelectedFilterData(type.value, options)
}

watch(selectedItems, () => !selectedItems.value.length && (dates.value = []))
</script>
<template>
  <a-range-picker v-model:value="dates" @change="onRangeChange" />
  <a-divider />
</template>
<style lang="scss" scoped>
.ant-picker-range {
  margin: 1rem;
  height: 40px;
}

.ant-btn {
  margin: 0 1rem;
}
</style>
