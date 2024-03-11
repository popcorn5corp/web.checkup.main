<template>
  <div class="form-item-wrapper">
    <FormItem v-bind="{ ...props }">
      <slot />
    </FormItem>
  </div>
</template>

<script setup lang="ts" name="FormItem">
import { FormItem } from 'ant-design-vue'
import type { FormItemProps } from '../types'

const props = defineProps<FormItemProps>()
</script>

<style lang="scss" scoped>
// .label-wrapper {
//   font-size: 15px;
//   font-weight: bold;
//   margin-bottom: 5px;
// }
:deep(.ant-form-item) {
  .ant-input-affix-wrapper {
    padding: 0 11px;
  }
  .ant-input-number-input-wrap {
    padding: 2px 0;
  }
  .ant-input {
    padding: 6.5px 11px;
  }

  .ant-select-selector {
    height: 36px;
    padding: 3px 11px;
  }
  .ant-form-item-label {
    > label {
      flex-direction: row-reverse;
    }
    > label::before {
      font-size: 16px !important;
      margin-left: 4px;
      padding-top: 6px;
    }
  }
}
</style>
