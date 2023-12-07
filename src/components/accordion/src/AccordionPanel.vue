<script setup lang="ts" name="AccordionPanel">
import { CollapsePanel } from 'ant-design-vue'
import type { AccordionPanelProps } from '../types'

defineProps<AccordionPanelProps>()
</script>

<template>
  <CollapsePanel :key="key" :header="header" :style="style">
    <slot>{{ text }}</slot>
    <template #extra><slot name="extra"></slot></template>
  </CollapsePanel>
</template>
