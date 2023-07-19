<!-- <script lang="ts" setup name="FilterComponents">
import { type PropType, computed } from 'vue'
import { type Filter, FilterTypes } from '../../types'

import Checkbox from './Checkbox.vue'
import Datepicker from './Datepicker.vue'
import Select from './Select.vue'
import Radio from './Radio.vue'

const props = defineProps({
  item: {
    type: Object as PropType<Filter>,
    default: () => {}
  }
})

const component = computed(() => {
  const a = props.item.type.charAt(0).toUpperCase() + props.item.type.slice(1)
  console.log(a)
  return a
})
// const component = computed(() => (true ? Checkbox : Datepicker))
</script>
<template>
  <component v-if="component" :is="component" />
  {{ component }} -->
<!-- <Checkbox v-if="item.type === FilterTypes.CHECKBOX" :item="item" />
  <Radio v-if="item.type === FilterTypes.RADIO" :item="item" />
  <Datepicker v-if="item.type === FilterTypes.DATEPICKER" :item="item" />
  <Select v-if="item.type === FilterTypes.SELECT" :item="item" /> -->
<!-- </template> -->
