<template>
  <!-- 
<span><slot name="date" /></span>

<template v-for="(log, index) in item.logs" :key="index">
  <p>
    <span style="margin-right: 3px"> <slot name="time" /> </span>

    <slot name="content" />
  </p>
</template> -->

  <template v-if="items">
    <template v-for="(item, index) in items" :key="index">
      <TimelineItem>
        <!-- Component -->
        <slot name="items" :items="{ item }" />

        <!-- Text -->
      </TimelineItem>
    </template>
  </template>

  <TimelineItem>
    <slot />
  </TimelineItem>
</template>

<script setup lang="ts" name="TimelineItem">
import { TimelineItem } from 'ant-design-vue'
import type { TimelineItemProps } from '../types'

defineProps<TimelineItemProps>()
</script>
<style lang="scss" scoped></style>
