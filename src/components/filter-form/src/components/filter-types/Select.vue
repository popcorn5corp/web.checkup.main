<template>
  <Select
    :allowClear="true"
    :value="selectedValue"
    :options="selectOptions"
    placeholder="전체"
    @change="onChange"
  >
    <slot></slot>
  </Select>
</template>

<script setup lang="ts" name="FilterSelect">
import { Select } from 'ant-design-vue'
import type { SelectProps, SelectValue } from 'ant-design-vue/es/select'
import { computed, ref, watch } from 'vue'
import { unref } from 'vue'
import type { Ref } from 'vue'
import { useDynamicTableContext } from '@/components/dynamic-table/hooks/useDynamicTableContext'
import type { FilterFormItem } from '../../../types'

interface FilterSelectProps {
  item: FilterFormItem
}

const props = defineProps<FilterSelectProps>()
const dynamicTable = useDynamicTableContext()
const formItem = computed(() => props.item)
const selectOptions = ref([...unref(formItem).options]) as Ref<SelectProps['options']>
const selectedValue = ref()

/**
 * @description 외부에서 selectedItems의 정보가 변경되었을 경우, checkedList에 적용
 */
watch(
  () => unref(formItem).selectedItems,
  (selectedItems) => {
    selectedValue.value = selectedItems && selectedItems.length > 0 ? selectedItems[0].value : null
  },
  {
    immediate: true
  }
)

const onChange = (value: SelectValue) => {
  const { options } = unref(formItem)
  const selectedItems = options.filter((option) => option.value === value)
  const filterFormItem: FilterFormItem = {
    ...unref(formItem),
    selectedItems
  }

  dynamicTable.setFilterFormItem(filterFormItem)
}
</script>

<style lang="scss" scoped>
.ant-select {
  width: 100%;

  :deep(.ant-select-selector) {
    height: 40px !important;
    display: flex;
    align-items: center;
  }
}
</style>
