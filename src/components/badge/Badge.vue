<template>
  <span :class="getBadgeClass">{{ text }}</span>
</template>

<script setup lang="ts" name="Badge">
import { computed } from 'vue'
import type { BadgeProps } from './types'

const props = defineProps<BadgeProps>()

const getBadgeClass = computed(() => {
  const { size, shape, theme } = props
  return [
    {
      [`badge`]: true,
      [`badge-${size}`]: true,
      [`badge-${shape}`]: true,
      [`badge-${theme}`]: true
    }
  ]
})
</script>

<style lang="scss" scoped>
.badge {
  display: inline-block;
  border: 1px solid transparent;
  padding: 3px 10px;
  font-weight: 500;
  font-size: 12px;
  background: #e6f7ff;
  color: #1890ff;
  border-color: #91d5ff;
}

.badge-squared {
  border-radius: 0;
}
.badge-round {
  border-radius: 7px;
}
.badge-pill {
  border-radius: 24px;
}

.badge-small {
  font-size: 10px;
}
.badge-medium {
  font-size: 12px;
}
.badge-large {
  font-size: 14px;
}

.badge-primary {
  background: #e6f7ff;
  color: #1890ff;
  border-color: #91d5ff;
}

.badge-primary-outline {
  border-color: #1890ff;
  color: #1890ff;
  background: transparent;
}

.badge-orange {
  background: #fffbe6;
  color: #faad14;
  border-color: #ffe58f;
}

.badge-orange-outline {
  border-color: #faad14;
  color: #faad14;
  background: transparent;
}

.badge-success {
  background: #f6ffed;
  color: #52c41a;
  border-color: #b7eb8f;
}

.badge-success-outline {
  border-color: orange;
  color: orange;
  background: transparent;
}

.badge-red {
  background: #fff2f0;
  color: #ff4d4f;
  border-color: #ffccc7;
}

.badge-red-outline {
  border-color: #ff4d4f;
  color: #ff4d4f;
  background: transparent;
}

.badge-default {
  background: #0000000c;
  color: #000000;
  border-color: rgb(0 0 0 / 3%);
}

.badge-default-outline {
  border-color: black;
  color: black;
  background: transparent;
}
</style>
