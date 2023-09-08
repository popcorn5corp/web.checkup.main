<script lang="ts" setup name="FilterRangeDatepicker">
import type { Dayjs } from 'dayjs'
import { ref, toRefs, watch } from 'vue'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import { type Filter } from '../../types'

const props = defineProps({
  item: {
    type: Object as PropType<Filter>,
    default: () => {}
  }
})

const { type, selectedItems } = toRefs(props.item)
const { setSelectedFilterData } = useTableFilterStore()
const dates = ref<[string, string] | [Dayjs, Dayjs] | undefined>()

const onRangeChange = (
  value: [Dayjs, Dayjs] | [string, string],
  dateString: [string, string]
): void => {
  const [startDate, endDate] = dateString
  const options = [{ label: `${startDate} ~ ${endDate}`, value: dateString, type: type.value }]
  setSelectedFilterData(type.value, options)
}

watch(selectedItems, () => !selectedItems.value.length && (dates.value = undefined))
</script>

<template>
  <a-range-picker :allowClear="false" v-model:value="dates" @change="onRangeChange" />
  <a-divider />
</template>

<style lang="scss" scoped>
.ant-picker-range {
  margin: 1rem;
  height: 40px;
}
</style>
