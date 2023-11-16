<script setup lang="ts" name="FilterSelect">
import { Select } from 'ant-design-vue'
import type { RawValueType } from 'ant-design-vue/es/vc-select/BaseSelect'
import type { LabelInValueType } from 'ant-design-vue/es/vc-select/Select'
import { toRefs } from 'vue'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import type { FilterFormItem } from '../../../types'

const props = defineProps({
  item: {
    type: Object as PropType<FilterFormItem>,
    default: () => {}
  }
})

const { type, options, selectedItems } = toRefs(props.item)
const { setSelectedFilterData } = useTableFilterStore()

const onSelect = (value: RawValueType | LabelInValueType, option: LabelValueType) => {
  setSelectedFilterData(type.value, [option])
}
</script>
<template>
  <!-- @vue-skip -->
  <Select
    :allowClear="true"
    @select="onSelect"
    v-model:value="selectedItems"
    :options="options"
    placeholder="전체"
  >
    <slot></slot>
  </Select>
</template>
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
