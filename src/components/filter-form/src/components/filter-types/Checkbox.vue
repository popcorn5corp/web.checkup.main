<template>
  <div class="filter-input">
    <Input placeholder="search" v-model:value="inputValue" @keyup="onKeyup">
      <template #suffix>
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </template>
    </Input>
  </div>

  <CheckboxGroup
    name="checkboxgroup"
    :value="checkedList"
    :options="checkboxOptions"
    @change="onChange"
  />
</template>

<script setup lang="ts" name="FilterCheckbox">
import { CheckboxGroup, Input } from 'ant-design-vue'
import type { CheckboxValueType } from 'ant-design-vue/es/checkbox/interface'
import { computed, ref, unref, watch } from 'vue'
import { useDynamicTableContext } from '@/components/dynamic-table/hooks/useDynamicTableContext'
import type { FilterFormItem } from '../../../types'

interface FilterCheckboxProps {
  item: FilterFormItem
}

const props = defineProps<FilterCheckboxProps>()
const dynamicTable = useDynamicTableContext()
const formItem = computed(() => props.item)
const checkedList = ref<CheckboxValueType[]>([])
const checkboxOptions = ref([...unref(formItem).options])
const inputValue = ref<string | undefined>()
const timer = ref()

/**
 * @description 외부에서 selectedItems의 정보가 변경되었을 경우, checkedList에 적용
 */
watch(
  () => unref(formItem).selectedItems,
  (selectedItems) => {
    checkedList.value =
      selectedItems && selectedItems.length > 0
        ? selectedItems.map((item) => {
            return item.value
          })
        : []
  },
  {
    immediate: true
  }
)

/**
 * @description 선택된 selectedItems 정보를 setContextValues 통해 변경
 * @param checkedValue
 */
const onChange = (checkedValue: CheckboxValueType[]) => {
  const { options } = unref(formItem)
  const selectedItems = options.filter((option) => checkedValue.includes(option.value))
  const filterFormItem: FilterFormItem = {
    ...unref(formItem),
    selectedItems
  }

  dynamicTable.setFilterFormItem(filterFormItem)
}

/**
 * @description Checkbox 목록 검색을 위한 options 세팅
 */
const filterOption = () => {
  const { options } = unref(formItem)
  checkboxOptions.value = inputValue.value
    ? options.filter((option) => option.label.includes(inputValue.value as string))
    : options
}

/**
 * @description Checkbox 목록 필터링을 위한 Keyup 이벤트
 * @param event
 */
const onKeyup = (event: KeyboardEvent) => {
  inputValue.value = (event.target as HTMLInputElement).value

  if (timer.value) {
    clearTimeout(timer.value)
  }

  timer.value = setTimeout(() => {
    filterOption()
  }, 500)
}
</script>

<style lang="scss" scoped>
.filter-input {
  width: 100%;
  :deep(.ant-input) {
    height: 28px;
  }
}

:deep(.ant-input-suffix) {
  color: $color-gray-5;
}

.ant-checkbox-group {
  padding: 1rem 0;
  display: flex;
  flex-direction: column;

  :deep(.ant-col) {
    margin-top: 1rem;
  }

  :deep(.ant-checkbox-group-item) {
    padding: 0.5rem;

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
