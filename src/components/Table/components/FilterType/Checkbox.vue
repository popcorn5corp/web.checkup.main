<script lang="ts" setup name="FilterCheckbox">
import { toRefs } from 'vue'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import type { Filter } from '../../types'
import type { CheckboxValueType } from 'ant-design-vue/es/checkbox/interface'
const { setSelectedFilterData } = useTableFilterStore()

const props = defineProps({
  item: {
    type: Object as PropType<Filter>,
    default: () => {}
  }
})
const { type, options, selected } = toRefs(props.item)

const onChange = (value: CheckboxValueType[]): void => {
  setSelectedFilterData(type.value, value)
}
</script>
<template>
  <div class="filter-input">
    <a-input placeholder="Basic usage">
      <template #prefix>
        <font-awesome-icon style="color: #d9d9d9" :icon="['fas', 'magnifying-glass']" />
      </template>
    </a-input>
  </div>
  <a-checkbox-group
    v-model:value="selected"
    @change="onChange"
    name="checkboxgroup"
    :options="options"
  ></a-checkbox-group>
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
  width: 100%;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;

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
