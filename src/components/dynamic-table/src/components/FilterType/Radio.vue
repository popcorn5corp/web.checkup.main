<script lang="ts" setup name="FilterRadio">
import { ref, toRefs } from 'vue'
import { watch } from 'vue'
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
const selectedOption = ref<boolean>(false)

const onChange = (options: LabelValueType) => {
  setSelectedFilterData(type.value, [options])
}

watch(selectedItems, () => {
  selectedOption.value = selectedItems.value.length
    ? (selectedItems.value[0].value as boolean)
    : false
})
</script>

<template>
  <a-radio-group
    v-for="({ label, value }, index) in options"
    v-model:value="selectedOption"
    :key="index"
    @change="onChange({ label, value: value as boolean })"
  >
    <a-radio :value="value">{{ label }}</a-radio>
  </a-radio-group>
</template>

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
