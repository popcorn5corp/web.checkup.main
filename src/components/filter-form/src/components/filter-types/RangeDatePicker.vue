<template>
  <RangePicker v-model:value="selectedRangeDate" :allowClear="true" @change="onRangeChange" />
</template>

<script setup lang="ts" name="FilterRangeDatePicker">
import { RangePicker } from 'ant-design-vue'
import dayjs, { type Dayjs } from 'dayjs'
import { computed, ref, unref, watch } from 'vue'
import { useDynamicTableContext } from '@/components/dynamic-table/hooks/useDynamicTableContext'
import { type FilterFormItem } from '../../../types'

interface FilterRangeDatePickerProps {
  item: FilterFormItem
}

const props = defineProps<FilterRangeDatePickerProps>()
const dynamicTable = useDynamicTableContext()
const formItem = computed(() => props.item)
const selectedRangeDate = ref<[string, string] | [Dayjs, Dayjs] | undefined>()

/**
 * @description 외부에서 selectedItems의 정보가 변경되었을 경우, selectedRangeDate 적용
 */
watch(
  () => unref(formItem).selectedItems,
  (selectedItems) => {
    const dateString = [selectedItems[0]?.value, selectedItems[1]?.value]
    selectedRangeDate.value =
      selectedItems && selectedItems.length > 0 && dateString
        ? // @ts-ignore
          [dayjs(dateString[0]), dayjs(dateString[1])]
        : undefined
  },
  {
    immediate: true
  }
)

/**
 * @description 선택된 selectedItems 정보를 setContextValues 통해 변경
 * @param value
 * @param dateString
 */
const onRangeChange = (
  value: [string, string] | [Dayjs, Dayjs],
  dateString: [string, string]
): void => {
  const [startDate, endDate] = dateString
  // const selectedItems = value
  //   ? [
  //       {
  //         label: `${startDate} ~ ${endDate}`,
  //         value: dateString
  //       }
  //     ]
  //   : []

  const selectedItems = value
    ? [
        { label: 'Start: ' + startDate, value: startDate },
        { label: 'End: ' + endDate, value: endDate }
      ]
    : []

  const filterFormItem: FilterFormItem = {
    ...unref(formItem),
    selectedItems
  }

  dynamicTable?.setFilterFormItem(filterFormItem)
}
</script>

<style lang="scss" scoped>
.ant-picker-range {
  width: 100%;
  height: 40px;
}
</style>
