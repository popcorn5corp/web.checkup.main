<script lang="ts" setup name="FilterDatepicker">
import { toRefs, ref, watch } from 'vue'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import { FilterTypes, type Filter } from '../../types'
import type { Dayjs } from 'dayjs'

const props = defineProps({
  item: {
    type: Object as PropType<Filter>,
    default: () => {}
  }
})

const { type, selectedItems } = toRefs(props.item)
const { setSelectedFilterData } = useTableFilterStore()
const date = ref<string | Dayjs | undefined>()

const onRangeChange = (value: string | Dayjs, dateString: string) => {
  const options =
    dateString === ''
      ? []
      : [
          {
            label: dateString,
            value: dateString,
            type: FilterTypes.DATEPICKER
          }
        ]

  setSelectedFilterData(type.value, options)
}

watch(selectedItems, () => !selectedItems.value.length && (date.value = undefined))
</script>

<template>
  <a-date-picker :allowClear="true" v-model:value="date" @change="onRangeChange" />
  <a-divider />
</template>

<style lang="scss" scoped>
.ant-picker {
  margin: 1rem;
  height: 40px;
}
</style>
