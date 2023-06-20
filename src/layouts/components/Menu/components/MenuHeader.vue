<script setup lang="ts" name="MenuHeader">
import Button from '@/stories/Button/Button.vue'

defineProps({
  collapsed: {
    type: Boolean
  }
})
</script>
<template>
  <div class="menu-header">
    <Button
      icon="plusCircle"
      :label="!collapsed ? '새 프로젝트' : ''"
      type="primary"
      shape="default"
    />
  </div>
</template>
<style lang="scss" scoped>
.menu-header {
  margin-top: 10px;
  text-align: center;
  height: 50px;
}
</style>
