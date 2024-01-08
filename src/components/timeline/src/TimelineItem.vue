<template>
  <TimelineItem v-bind="{ ...props }">
    <slot />
  </TimelineItem>
</template>

<script setup lang="ts" name="TimelineItem">
import { TimelineItem } from 'ant-design-vue'
import type { TimelineItemProps } from '../types'

const props = defineProps<TimelineItemProps>()
</script>
<style lang="scss" scoped></style>
