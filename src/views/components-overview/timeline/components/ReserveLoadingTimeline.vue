<template>
  <div>
    <Timeline pending="Recording..." :reverse="reverse">
      <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
      <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
      <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
    </Timeline>

    <a-button type="primary" style="margin-top: 16px" @click="handleClick">Toggle Reverse</a-button>
  </div>
</template>

<script setup lang="ts" name="ComponentsOverviewDefaultTimeline">
import { ref } from 'vue'
import { Timeline } from '@/components/timeline'

const reverse = ref<boolean>(false)

const handleClick = () => {
  reverse.value = !reverse.value
}
</script>
