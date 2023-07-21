<script lang="ts" setup name="FilterSelect">
import { toRefs } from 'vue'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import type { Filter } from '../../types'
import type { RawValueType } from 'ant-design-vue/es/vc-select/BaseSelect'
import type { LabelInValueType } from 'ant-design-vue/es/vc-select/Select'

const props = defineProps({
  item: {
    type: Object as PropType<Filter>,
    default: () => {}
  }
})
const { type, options, selectedItems } = toRefs(props.item)
const { setSelectedFilterData } = useTableFilterStore()

const onSelect = (value: RawValueType | LabelInValueType, option: LabelInValueType) => {
  setSelectedFilterData(type.value, [option])
}
</script>
<template>
  <a-select
    @select="onSelect"
    v-model:value="selectedItems"
    placeholder="Select"
    :options="options"
  />
  <a-divider />
</template>
<style lang="scss" scoped>
.ant-select {
  margin: 1rem;
  :deep(.ant-select-selector) {
    height: 40px !important;
    display: flex;
    align-items: center;
  }
}
</style>
