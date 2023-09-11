<script lang="ts" setup name="FilterSelect">
import type { RawValueType } from 'ant-design-vue/es/vc-select/BaseSelect'
import type { LabelInValueType } from 'ant-design-vue/es/vc-select/Select'
import { toRefs } from 'vue'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import type { Filter } from '../../../interface'

const props = defineProps({
  item: {
    type: Object as PropType<Filter>,
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
  <a-select
    :allowClear="true"
    @select="onSelect"
    v-model:value="selectedItems"
    :options="options"
    placeholder="전체"
  />
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
