<template>
  <div class="form-item-rest-wrapper">
    <FormItemRest v-bind="{ ...props }">
      <slot />
    </FormItemRest>
  </div>
</template>

<script setup lang="ts" name="FormItemRestProps">
import { FormItemRest } from 'ant-design-vue'
import type { FormItemRestProps } from '../types'

const props = defineProps<FormItemRestProps>()
</script>
