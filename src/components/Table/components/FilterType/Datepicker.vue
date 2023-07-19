<script lang="ts" setup name="FilterDatepicker">
import { toRefs } from 'vue'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import type { Dayjs } from 'dayjs'
import type { Filter } from '../../types'

const { setSelectedFilterData } = useTableFilterStore()

const props = defineProps({
  item: {
    type: Object as PropType<Filter>,
    default: () => {}
  }
})

const { type, selected } = toRefs(props.item)

const onRangeChange = (
  value: [Dayjs, Dayjs] | [string, string],
  dateString: [string, string]
): void => {
  setSelectedFilterData(type.value, dateString)
}
</script>
<template>
  <a-range-picker @change="onRangeChange" />
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
