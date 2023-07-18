<script lang="ts" setup name="FilterRadio">
import { toRefs } from 'vue'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import type { Filter } from '../../types'
import type { RadioChangeEvent } from 'ant-design-vue'
const { setSelectedFilterData } = useTableFilterStore()

const props = defineProps({
  item: {
    type: Object as PropType<Filter>,
    default: () => {}
  }
})
const { type, options, selected } = toRefs(props.item)

const onChange = ({ target: { value } }: RadioChangeEvent): void => {
  setSelectedFilterData(type.value, value)
}
</script>
<template>
  <a-radio-group v-for="{ label, value } in options" v-model:value="selected" @change="onChange">
    <a-radio :value="{ label, value }">{{ label }}</a-radio>
  </a-radio-group>
  <a-divider />
</template>
<style lang="scss" scoped>
.ant-radio-group {
  margin: 0 1rem;
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
