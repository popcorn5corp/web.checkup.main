<template>
  <!-- <KeepAlive> -->
  <component :is="LayoutComponents[layout]">
    <RouterView></RouterView>
  </component>
  <!-- </KeepAlive> -->

  <!-- <ThemeDrawer /> -->
</template>

<script setup lang="ts" name="Layout">
import { type Component, computed } from 'vue'
import type { LayoutType } from '@/stores/interface'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
// import ThemeDrawer from './components/ThemeDrawer/index.vue'
import LayoutDefault from './LayoutDefault/index.vue'

const LayoutComponents: Record<LayoutType, Component> = {
  default: LayoutDefault
}

const { config } = useProjectConfigStore()
const layout = computed(() => config.layout)
</script>

<style scoped lang="scss">
.layout {
  min-width: 730px;
}
</style>
