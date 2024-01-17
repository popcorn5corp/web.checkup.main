<template>
  <Tour v-model:current="current" :open="open" :steps="steps" @close="handleOpen(false)" />

  <a-button type="primary" @click="handleOpen(true)">Begin Tour</a-button>

  <a-divider />

  <a-space>
    <a-button ref="ref1">Upload</a-button>
    <a-button ref="ref2" type="primary">Save</a-button>
    <a-button ref="ref3"><EllipsisOutlined /></a-button>
  </a-space>
</template>

<script setup lang="ts">
import { EllipsisOutlined } from '@ant-design/icons-vue'
import { Tour } from 'ant-design-vue'
import { ref } from 'vue'
import type { TourProps } from '../types'
import { steps } from './mock'

const props = defineProps<TourProps>()

const open = ref<boolean>(false)

const ref1 = ref(null)
const ref2 = ref(null)
const ref3 = ref(null)
const current = ref(0)

const handleOpen = (val: boolean): void => {
  open.value = val
}
</script>
