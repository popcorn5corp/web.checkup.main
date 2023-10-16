<template>
  <div class="logo">
    <RouterLink :to="'/'">
      <img :src="imgPath" />
    </RouterLink>
  </div>
</template>
<script setup lang="ts" name="Logo">
defineProps<{ imgPath: string }>()
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  align-items: center;
}
</style>
