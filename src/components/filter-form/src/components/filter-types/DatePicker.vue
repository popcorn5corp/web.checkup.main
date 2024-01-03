<template>
  <DatePicker v-model:value="selectedDate" :allowClear="true" @change="onChange" />
</template>

<script setup lang="ts" name="FilterDatePicker">
import { DatePicker } from 'ant-design-vue'
import dayjs, { type Dayjs } from 'dayjs'
import { computed, ref, unref, watch } from 'vue'
import { useDynamicTableContext } from '@/components/dynamic-table/hooks/useDynamicTableContext'
import { type FilterFormItem } from '../../../types'

interface FilterDatePickerProps {
  item: FilterFormItem
}

const props = defineProps<FilterDatePickerProps>()
const dynamicTable = useDynamicTableContext()
const formItem = computed(() => props.item)
const selectedDate = ref<string | Dayjs | undefined>()

/**
 * @description 외부에서 selectedItems의 정보가 변경되었을 경우, selectedDate에 적용
 */
watch(
  () => unref(formItem).selectedItems,
  (selectedItems) => {
    const dateString = (selectedItems && selectedItems[0]?.value) as string | undefined
    selectedDate.value = dateString ? dayjs(dateString) : undefined
  },
  {
    immediate: true
  }
)

/**
 * 선택된 selectedItems 정보를 setContextValues 통해 변경
 * @param value
 * @param dateString
 */
const onChange = (value: string | Dayjs, dateString: string) => {
  const selectedItems = dateString ? [{ label: 'Date: ' + dateString, value: dateString }] : []
  const filterFormItem: FilterFormItem = {
    ...unref(formItem),
    selectedItems
  }

  dynamicTable?.setFilterFormItem(filterFormItem)
}
</script>

<style lang="scss" scoped>
.ant-picker {
  width: 100%;
  height: 40px;
}
</style>
