<template>
  <div class="input-container">
    <Input v-bind="{ ...props }">
      <template #prefix>
        <slot name="prefix" />
      </template>
      <template #suffix>
        <slot name="suffix" />
      </template>
      <template #clearIcon>
        <slot name="clearIcon" />
      </template>
    </Input>
  </div>
</template>

<script setup lang="ts" name="Input">
import { Input } from 'ant-design-vue'
import type { InputProps } from '../types'

const props = withDefaults(defineProps<InputProps>(), {
  bordered: true
})
</script>

<style scoped lang="scss">
.input-container {
  // .ant-input-affix-wrapper {
  //   padding: 6.5px 11px !important;
  // }

  .ant-input {
    padding: 6.5px 11px !important;
  }

  // .error {
  //   border: 1.5px solid $color-feedback-error !important;
  // }
}
</style>
