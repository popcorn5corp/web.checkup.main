<template>
  <Tour :steps="steps" v-model:open="open" @change="onChange" />

  <a-button type="primary" @click="handleOpen(true)">Begin Tour</a-button>

  <a-divider />

  <a-space>
    <a-button :ref="(ref) => tour.setTour(0, ref as Element, tourType)">Upload</a-button>

    <div :ref="(ref) => tour.setTour(1, ref as Element, tourType)">
      <a-dropdown-button v-model:open="visible">
        Dropdown
        <template #overlay>
          <a-menu>
            <a-menu-item key="1">
              <UserOutlined />
              1st menu item
            </a-menu-item>
            <a-menu-item key="2">
              <UserOutlined />
              2nd menu item
            </a-menu-item>
            <a-menu-item key="3">
              <UserOutlined />
              3rd item
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown-button>
    </div>

    <a-button :ref="(ref) => tour.setTour(2, ref as Element, tourType)" type="primary"
      >Save</a-button
    >
  </a-space>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTourStore } from '@/stores/modules/tour'
import { UserOutlined } from '@/components/icons'
import { Tour } from '@/components/tour'
import { useTour } from '@/components/tour/hooks/useTour'
import { TOUR_TYPE } from '@/components/tour/types'

const tourStore = useTourStore()
const tour = useTour()

const tourType = TOUR_TYPE.OVERVIEW_PAGE_TOUR
const steps = computed(() => tourStore.getTour(tourType))

const visible = ref(false)
const open = ref(false)

const handleOpen = (val: boolean) => {
  open.value = val
}

const onChange = (current: number) => {
  visible.value = current === 1 ? true : false
}
</script>
