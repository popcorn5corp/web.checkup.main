<script lang="ts" setup name="FilterComponents">
import { FilterTypeEnum } from '../../types'

import Checkbox from './Checkbox.vue'
import Datepicker from './Datepicker.vue'
import Select from './Select.vue'
import Radio from './Radio.vue'

defineProps({
  type: {
    type: String
  }
})
</script>
<template>
  <Checkbox v-if="type === FilterTypeEnum.CHECKBOX" />
  <Radio v-if="type === FilterTypeEnum.RADIO" />
  <Datepicker v-if="type === FilterTypeEnum.DATEPICKER" />
  <Select v-if="type === FilterTypeEnum.SELECT" />
</template>
