<template>
  <component :is="LayoutComponents[layout]">
    <RouterView></RouterView>
  </component>
</template>

<script setup lang="ts" name="Layout">
import { type Component, computed } from 'vue'
import { useRoute } from 'vue-router'
import { type LayoutType, layoutTypes } from '@/config/default/themeConfig'
import LayoutDefault from './default/index.vue'
import LayoutPure from './pure/index.vue'

const route = useRoute()
const LayoutComponents: Record<LayoutType, Component> = {
  default: LayoutDefault,
  pure: LayoutPure
}

const layout = computed(() => (route.meta.layout as LayoutType) || layoutTypes.default)
</script>

<style scoped lang="scss">
.layout {
  min-width: 730px;
}
</style>
