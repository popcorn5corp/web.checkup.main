<script setup lang="ts" name="FilterDatePicker">
import type { Dayjs } from 'dayjs'
import { type PropType, ref, toRefs, watch } from 'vue'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import { FILTER_UI, type FilterFormItem } from '../../../types'

const props = defineProps({
  item: {
    type: Object as PropType<FilterFormItem>,
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
            type: FILTER_UI.DATE_PICKER
          }
        ]

  setSelectedFilterData(type.value, options)
}

watch(selectedItems, () => !selectedItems.value.length && (date.value = undefined))
</script>

<template>
  <a-date-picker :allowClear="true" v-model:value="date" @change="onRangeChange" />
</template>

<style lang="scss" scoped>
.ant-picker {
  width: 100%;
  height: 40px;
}
</style>
