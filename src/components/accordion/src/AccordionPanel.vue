<template>
  <CollapsePanel v-bind="{ ...props }" :key="key" :style="style" @change="onChange">
    <template #header
      ><slot name="header">{{ header }}</slot></template
    >
    <slot>{{ text }}</slot>
    <template #extra><slot name="extra"></slot></template>
  </CollapsePanel>
</template>

<script setup lang="ts" name="AccordionPanel">
import { CollapsePanel } from 'ant-design-vue'
import type { CollapsePanelProps } from '../types'

const props = defineProps<CollapsePanelProps>()

const onChange = (e) => {
  console.log(e.target.value)
}
</script>
