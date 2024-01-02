<template>
  <div class="menu-item-content">
    <span class="icon">
      <font-awesome-icon :icon="['fas', props.item.meta?.icon || 'minus']" />
      <!-- <img src="../../../../assets/svgs/feature1.svg" style="width: 30px" /> -->
    </span>
    <span class="menu-title">{{ props.item.meta?.title }}</span>
  </div>
</template>

<script setup lang="ts" name="MenuItemContent">
import type { RouteRecordRaw } from 'vue-router'

defineOptions({
  name: 'MenuItemContent'
})

interface Props {
  item: RouteRecordRaw
}

const props = withDefaults(defineProps<Props>(), {
  item: undefined
})
</script>
<style lang="scss" scoped>
.menu-item-content {
  display: flex;

  .icon {
    margin-right: 10px;
  }
  .menu-item {
    display: flex;
    line-height: 30px;
  }
  .menu-title {
    font-size: 0.9em;
    font-size: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-grow: 1;
    transition: color 0.3s;
    font-weight: 500;
  }
}
</style>
