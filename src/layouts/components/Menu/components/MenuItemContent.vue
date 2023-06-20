<template>
  <!-- <div class="menu-item"> -->
  <!-- <span class="menu-icon"> -->
  <!-- <i class="ri-vip-diamond-fill"></i> -->
  <!-- <user-outlined /> -->
  <LaptopOutlined />
  <!-- </span> -->
  <span class="menu-title">{{ props.item.meta?.title }}</span>
</template>

<script setup lang="ts" name="MenuItemContent">
import type { RouteRecordRaw } from 'vue-router'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue'

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
:deep(span.anticon.anticon-laptop) {
  margin-inline-end: 10px;
  margin-right: 0.5rem;
  font-size: 0.8125rem;
  line-height: 1;
  background: rgba(108, 114, 147, 0.2);
  width: 31px;
  height: 31px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}
.menu-item {
  display: flex;
  line-height: 30px;
}
.menu-icon {
}
</style>
