<template>
  <span :class="getLabelClass">{{ text }}</span>
</template>

<script setup lang="ts" name="Label">
import { computed } from 'vue'
import type { LabelProps } from '../types'

const props = defineProps<LabelProps>()

const getLabelClass = computed(() => {
  const { size, shape, theme } = props
  return [
    {
      [`Label`]: true,
      [`Label-${size}`]: true,
      [`Label-${shape}`]: true,
      [`Label-${theme}`]: true
    }
  ]
})
</script>

<style lang="scss" scoped>
.Label {
  display: inline-block;
  border: 1px solid transparent;
  padding: 3px 10px;
  font-weight: 500;
  font-size: 12px;
  background: #e6f7ff;
  color: #1890ff;
  border-color: #91d5ff;
}

.Label-squared {
  border-radius: 0;
}
.Label-round {
  border-radius: 7px;
}
.Label-pill {
  border-radius: 24px;
}

.Label-small {
  font-size: 10px;
}
.Label-medium {
  font-size: 12px;
}
.Label-large {
  font-size: 14px;
}

.Label-primary {
  background: #e6f7ff;
  color: #1890ff;
  border-color: #91d5ff;
}

.Label-primary-outline {
  border-color: #1890ff;
  color: #1890ff;
  background: transparent;
}

.Label-orange {
  background: #fffbe6;
  color: #faad14;
  border-color: #ffe58f;
}

.Label-orange-outline {
  border-color: #faad14;
  color: #faad14;
  background: transparent;
}

.Label-success {
  background: #f6ffed;
  color: #52c41a;
  border-color: #b7eb8f;
}

.Label-success-outline {
  border-color: orange;
  color: orange;
  background: transparent;
}

.Label-red {
  background: #fff2f0;
  color: #ff4d4f;
  border-color: #ffccc7;
}

.Label-red-outline {
  border-color: #ff4d4f;
  color: #ff4d4f;
  background: transparent;
}

.Label-default {
  background: #0000000c;
  color: #000000;
  border-color: rgb(0 0 0 / 3%);
}

.Label-default-outline {
  border-color: black;
  color: black;
  background: transparent;
}
</style>
