<script setup lang="ts" name="MenuHeader">
import { computed, type CSSProperties } from 'vue'
import Button from '@/stories/Button/Button.vue'
import { PlusCircleFilled } from '@/components/Icon'

const props = defineProps({
  collapsed: {
    type: Boolean
  }
})

const menuHeaderbuttonStyle = computed<CSSProperties>(() => {
  return {
    width: !props.collapsed ? '180px' : '50px'
  }
})
</script>
<template>
  <div class="menu-header">
    <Button type="primary" :label="!collapsed ? '새 프로젝트' : ''" :style="menuHeaderbuttonStyle">
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
