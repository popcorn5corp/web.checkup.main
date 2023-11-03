<script lang="ts" setup name="FilterRangeDatepicker">
import { RangePicker } from 'ant-design-vue'
import type { Dayjs } from 'dayjs'
import { ref, toRefs, watch } from 'vue'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import { type FilterFormItem } from '../../../types'

const props = defineProps({
  item: {
    type: Object as PropType<FilterFormItem>,
    default: () => {}
  }
})

const { type, selectedItems } = toRefs(props.item)
const { setSelectedFilterData } = useTableFilterStore()
const selectedDate = ref<[string, string] | [Dayjs, Dayjs] | undefined>()

const onRangeChange = (
  value: [Dayjs, Dayjs] | [string, string],
  dateString: [string, string]
): void => {
  const [startDate, endDate] = dateString
  const options = [{ label: `${startDate} ~ ${endDate}`, value: dateString, type: type.value }]
  setSelectedFilterData(type.value, options)
}

watch(selectedItems, () => {
  console.log('selectedItems ', selectedItems)
  !selectedItems.value.length && (selectedDate.value = undefined)
})
</script>

<template>
  <RangePicker v-model:value="selectedDate" :allowClear="true" @change="onRangeChange" />
</template>

<style lang="scss" scoped>
.ant-picker-range {
  width: 100%;
  height: 40px;
}
</style>
