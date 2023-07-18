<script lang="ts" setup name="FilterComponents">
import type { PropType } from 'vue'
import { type Filter, FilterTypeEnum } from '../../types'

import Checkbox from './Checkbox.vue'
import Datepicker from './Datepicker.vue'
import Select from './Select.vue'
import Radio from './Radio.vue'

defineProps({
  item: {
    type: Object as PropType<Filter>,
    default: () => {}
  }
})
</script>
<template>
  <Checkbox v-if="item.type === FilterTypeEnum.CHECKBOX" :item="item" />
  <Radio v-if="item.type === FilterTypeEnum.RADIO" :item="item" />
  <Datepicker v-if="item.type === FilterTypeEnum.DATEPICKER" :item="item" />
  <Select v-if="item.type === FilterTypeEnum.SELECT" :item="item" />
</template>
