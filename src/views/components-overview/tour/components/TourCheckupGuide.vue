<template>
  <Tour :steps="steps" v-model:open="open" @change="onChange" />

  <a-button type="primary" @click="handleOpen(true)"
    >Go to CheckUp Guide<RightOutlined />
  </a-button>

  <a-divider />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTourStore } from '@/stores/modules/tour'
import { RightOutlined } from '@/components/icons'
import { Tour } from '@/components/tour'
import { TOUR_TYPE } from '@/components/tour/types'

const tourStore = useTourStore()

const tourType = TOUR_TYPE.CHECKUP_TOUR_DEMO
const steps = computed(() => tourStore.getTour(tourType))

const open = ref(false)

const handleOpen = (val: boolean) => {
  open.value = val
}

const onChange = () => {
  console.log('change')
}
</script>
