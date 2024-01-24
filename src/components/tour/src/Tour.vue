<template>
  <Tour :open="open" :steps="steps" @close="handleOpen(false)" @change="onChange" />
</template>

<script lang="ts" setup name="Tour">
import { Tour } from 'ant-design-vue'
import { useTourStore } from '@/stores/modules/tour'
import { useTour } from '@/components/tour/hooks/useTour'
import type { TourEmits, TourProps } from '../types'

const props = defineProps<TourProps>()
const emit = defineEmits<TourEmits>()
const tour = useTour()
const tourStore = useTourStore()

const handleOpen = (val: boolean): void => {
  emit('update:open', val)
}

const onChange = (index: number): void => {
  tour.changeTour(tourStore.getCurrStep(props.steps, index))

  emit('change', index)
}
</script>
