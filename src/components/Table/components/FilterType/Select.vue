<script lang="ts" setup name="FilterSelect">
import { toRefs } from 'vue'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import type { Filter } from '../../types'

const { setSelectedFilterData } = useTableFilterStore()
const props = defineProps({
  item: {
    type: Object as PropType<Filter>,
    default: () => {}
  }
})
const { type, options, selected } = toRefs(props.item)

const onSelect = (_, option) => {
  setSelectedFilterData(type.value, option)
}
</script>
<template>
  <a-select @select="onSelect" v-model:value="selected" placeholder="Select" :options="options" />
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
