<template>
  <RadioGroup v-model:value="selectedValue" @change="onChange">
    <template v-for="({ label, value }, index) in formItem.options" :key="index">
      <Radio :value="value">{{ label }}</Radio>
    </template>
  </RadioGroup>
</template>

<script setup lang="ts" name="FilterRadio">
import { Radio, type RadioChangeEvent, RadioGroup } from 'ant-design-vue'
import { computed, ref, unref } from 'vue'
import { watch } from 'vue'
import { useDynamicTableContext } from '@/components/dynamic-table/hooks/useDynamicTableContext'
import type { FilterFormItem } from '../../../types'

interface FilterRadioProps {
  item: FilterFormItem
}

const props = defineProps<FilterRadioProps>()
const dynamicTable = useDynamicTableContext()
const formItem = computed(() => props.item)
const selectedValue = ref()

/**
 * @description 외부에서 selectedItems의 정보가 변경되었을 경우, checkedList에 적용
 */
watch(
  () => unref(formItem).selectedItems,
  (selectedItems) => {
    selectedValue.value = selectedItems && selectedItems.length ? selectedItems[0].value : null
  },
  {
    immediate: true
  }
)

/**
 * @description 선택된 selectedItems 정보를 setContextValues 통해 변경
 * @param e
 */
const onChange = (e: RadioChangeEvent) => {
  const checkedValue = e.target.value
  const { options } = unref(formItem)
  const selectedItems = options.filter((option) => checkedValue.includes(option.value))
  const filterFormItem: FilterFormItem = {
    ...unref(formItem),
    selectedItems
  }

  dynamicTable?.setFilterFormItem(filterFormItem)
}
</script>

<style lang="scss" scoped>
.ant-radio-group {
  width: 100%;
  display: flex;
  flex-direction: column;

  :deep(.ant-radio-wrapper) {
    padding: 1rem;
    &:hover {
      background: rgba(229, 232, 235, 0.2);
      border-radius: 10px;
      cursor: pointer;
    }
  }

  :deep(:where(.css-dev-only-do-not-override-16iczrm).ant-checkbox .ant-checkbox-inner:after) {
    width: 5.714286px !important;
    height: 14.142857px !important;
    top: 40% !important;
  }

  :deep(.ant-checkbox-inner) {
    height: 24px !important;
    width: 24px !important;
  }
}

.ant-divider {
  margin: 6px 0;
}
</style>
