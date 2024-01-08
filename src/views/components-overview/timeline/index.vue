<template>
  <div class="timeline-container">
    <AlternateTimeline />

    <div class="timeline-wrapper">
      <ReserveLoadingTimeline />
      <DataTimeline style="width: 50%" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AlternateTimeline from './components/AlternateTimeline.vue'
import DataTimeline from './components/DataTimeline.vue'
import ReserveLoadingTimeline from './components/ReserveLoadingTimeline.vue'
</script>

<style lang="scss" scoped>
.timeline-container {
  display: flex;
  gap: 3rem;
  padding: 2rem 0;
  flex-direction: column;
}

.timeline-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
</style>
