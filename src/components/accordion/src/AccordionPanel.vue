<script setup lang="ts">
import { CollapsePanel } from 'ant-design-vue'
import type { AccordionPanelProps } from '../interface'

defineProps<AccordionPanelProps>()
</script>

<template>
  <CollapsePanel :key="key" :header="header" :style="style">
    <slot>{{ text }}</slot>
  </CollapsePanel>
</template>
