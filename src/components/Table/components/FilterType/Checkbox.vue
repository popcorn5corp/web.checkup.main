<script lang="ts" setup name="FilterCheckbox">
import { toRefs, ref, computed } from 'vue'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import type { Filter } from '../../types'
import type { CheckboxValueType } from 'ant-design-vue/es/checkbox/interface'

const props = defineProps({
  item: {
    type: Object as PropType<Filter>,
    default: () => {}
  }
})

const { type, options, selectedItems } = toRefs(props.item)
const { setSelectedFilterData } = useTableFilterStore()
const inputValue = ref<string | undefined>()

const onSelect = (options: LabelValueType[]) => {
  setSelectedFilterData(type.value, options)
}

const filterOption = computed<LabelValue[]>(() =>
  inputValue.value
    ? options.value.filter((option) => option.label.includes(inputValue.value as string))
    : options.value
)
</script>
<template>
  <div class="filter-input">
    <a-input placeholder="search" v-model:value="inputValue">
      <template #suffix>
        <font-awesome-icon style="color: #d9d9d9" :icon="['fas', 'magnifying-glass']" />
      </template>
    </a-input>
  </div>
  <a-checkbox-group v-model:value="selectedItems" @change="onSelect" name="checkboxgroup">
    <template v-for="option in filterOption">
      <a-col>
        <a-checkbox :value="option">{{ option.label }}</a-checkbox>
      </a-col>
    </template>
  </a-checkbox-group>
  <a-divider />
</template>
<style lang="scss" scoped>
.filter-input {
  margin: 9px 16px -13px;
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
