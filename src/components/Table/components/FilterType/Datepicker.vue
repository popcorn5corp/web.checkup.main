<script lang="ts" setup name="FilterDatepicker">
import type { Dayjs } from 'dayjs'
import { ref, toRefs, watch } from 'vue'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import { type Filter, FilterTypes } from '../../interface'

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
            type: FilterTypes.DATE_PICKER
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
