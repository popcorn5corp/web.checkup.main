<template>
  <div>
    <Timeline pending="Recording..." :showBtn="true" :reverse="reverse" @click="handleReverse">
      <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
      <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
      <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>

      <template #button-text> Toggle Reverse </template>
    </Timeline>
  </div>
</template>

<script setup lang="ts" name="ComponentsOverviewDefaultTimeline">
import { ref } from 'vue'
import { Timeline } from '@/components/timeline'

const reverse = ref<boolean>(false)

const handleReverse = () => {
  reverse.value = !reverse.value
}
</script>
