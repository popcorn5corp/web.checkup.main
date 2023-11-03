<script lang="ts" setup name="FilterCheckbox">
import { Checkbox, CheckboxGroup, Col, Input } from 'ant-design-vue'
import { ref, unref, watch } from 'vue'
import { useDynamicTableContext } from '@/components/dynamic-table/hooks/useDynamicTableContext'
import type { FilterFormItem } from '../../../types'

interface FilterCheckboxProps {
  item: FilterFormItem
}

const props = defineProps<FilterCheckboxProps>()
const { type, options, selectedItems, index } = props.item
const dynamicTable = useDynamicTableContext()
const checkboxOptions = ref([...options])
const inputValue = ref<string | undefined>()
const timer = ref()
const checkedList = ref()

watch(
  () => unref(checkedList),
  () => {
    const filterFormItems = unref(dynamicTable.getContextValues).filterFormItems
    filterFormItems[index] = {
      ...filterFormItems[index],
      selectedItems: [...unref(checkedList)]
    }

    dynamicTable.setContextValues({ filterFormItems })
  }
)

const filterOption = () => {
  checkboxOptions.value = inputValue.value
    ? options.filter((option) => option.label.includes(inputValue.value as string))
    : options
}

const onKeyup = (e: any) => {
  inputValue.value = e.target.value

  if (timer.value) {
    clearTimeout(timer.value)
  }

  timer.value = setTimeout(() => {
    filterOption()
  }, 500)
}
</script>
<template>
  <div class="filter-input">
    <Input placeholder="search" v-model:value="inputValue" @keyup="onKeyup">
      <template #suffix>
        <font-awesome-icon style="color: #d9d9d9" :icon="['fas', 'magnifying-glass']" />
      </template>
    </Input>
  </div>

  <CheckboxGroup v-model:value="checkedList" name="checkboxgroup">
    <template v-for="(option, index) in checkboxOptions" :key="index">
      <Col>
        <Checkbox :value="option">{{ option.label }}</Checkbox>
      </Col>
    </template>
  </CheckboxGroup>
</template>
<style lang="scss" scoped>
.filter-input {
  width: 100%;
  :deep(.ant-input) {
    height: 28px;
  }
}

.ant-checkbox-group {
  width: 80%;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;

  :deep(.ant-col) {
    margin-top: 1rem;
  }

  :deep(.ant-checkbox-group-item) {
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
