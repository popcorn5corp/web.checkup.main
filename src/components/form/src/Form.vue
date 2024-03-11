<template>
  <div class="form-container">
    <Form v-bind="{ ...props }" layout="vertical">
      <slot />
    </Form>
  </div>
</template>

<script setup lang="ts" name="Form">
import { Form } from 'ant-design-vue'
import type { FormProps } from '../types'

const props = defineProps<FormProps>()
</script>

<style lang="scss" scoped></style>
