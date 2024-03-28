<template>
  <div class="form-item-wrapper">
    <FormItem v-bind="{ ...props }" :class="[props.isError && 'error']">
      <slot />

      <div class="valid-text" v-if="props.isError">
        <slot name="validText" />
      </div>
    </FormItem>
  </div>
</template>

<script setup lang="ts" name="FormItem">
import { FormItem } from 'ant-design-vue'
import type { FormItemProps } from '../types'

const props = defineProps<FormItemProps>()
</script>

<style lang="scss" scoped>
.form-item-wrapper {
  :deep(.ant-form-item) {
    margin-bottom: 16px;

    &.error {
      // .ant-select,
      .ant-select-selector,
      .ant-input-affix-wrapper {
        border: 1.5px solid $color-feedback-error !important;
      }
    }

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

    .valid-text {
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
}
</style>
