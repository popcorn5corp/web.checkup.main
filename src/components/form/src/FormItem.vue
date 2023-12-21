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
