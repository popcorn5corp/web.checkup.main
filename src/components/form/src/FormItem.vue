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
:deep(.ant-form-item) {
  margin-bottom: 16px;

  .ant-select-selector {
    height: 36px;
    padding: 0 11px;
  }
  .ant-select-selection-item,
  .ant-select-selection-placeholder {
    line-height: 36px;
  }
  .ant-select-selection-item {
    height: 36px;
  }
  .ant-form-item-label {
    padding: 0;
    > label {
      font-size: 14px;
      flex-direction: row-reverse;
    }
    > label::before {
      font-size: 16px !important;
      margin-left: 4px;
      padding-top: 6px;
    }
  }

  .errorMsg {
    color: $color-feedback-error;
    font-size: 13px;
    text-align: left;
    text-wrap: nowrap;
    margin-top: 0.3rem;
    margin-left: 3px;
  }

  .ant-row {
    align-items: center;
  }
}
</style>
