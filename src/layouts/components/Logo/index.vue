<template>
  <RouterLink class="logo" :style="getStyle.logo" :to="'/'">
    <img :src="imagePath" :style="getStyle.img" />
  </RouterLink>
</template>
<script setup lang="tsx">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'

defineOptions({
  name: 'Logo'
})

const { config } = useProjectConfigStore()
const imagePath = computed(
  () => new URL(`/src/assets/images/${config.theme.logoFileName}`, import.meta.url).href
)
const getStyle = computed<{ logo: CSSProperties; img: CSSProperties }>(() => {
  return {
    logo: {
      padding: config.isCollapse ? '10px' : ''
    },
    img: {
      width: config.isCollapse ? '60px' : '220px'
    }
  }
})
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  align-items: center;
  height: 55px;
  // padding-left: 24px;
  // line-height: 64px;

  .title {
    color: blue;
    margin-bottom: 0;
  }
}
</style>
