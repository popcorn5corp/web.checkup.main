<template>
  <div class="logo" :style="logoStyle">
    <img :src="imagePath" />
  </div>
</template>
<script setup lang="ts" name="Logo">
import { computed, type CSSProperties } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'

const { config } = useProjectConfigStore()
const imagePath = computed(
  () => new URL(`/src/assets/images/${config.theme.logoFileName}`, import.meta.url).href
)
const logoStyle = computed<CSSProperties>(() => {
  return {
    padding: config.isCollapse ? '10px' : ''
  }
})
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  align-items: center;
  height: 64px;
  // padding-left: 24px;
  line-height: 64px;

  img {
    // height: 32px;
    // margin-right: 8px;
    width: 100%;
  }

  .title {
    color: blue;
    margin-bottom: 0;
  }
}
</style>
