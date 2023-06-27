<script setup lang="ts" name="MenuHeader">
import Button from '@/stories/Button/Button.vue'
import { PlusCircleFilled } from '@/components/Icon'

defineProps({
  collapsed: {
    type: Boolean
  }
})
</script>
<template>
  <div class="menu-header">
    <Button type="primary" :label="!collapsed ? '새 프로젝트' : ''" style="width: 180px">
      <template #icon>
        <PlusCircleFilled />
      </template>
    </Button>
  </div>
</template>
<style lang="scss" scoped>
.menu-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
</style>
