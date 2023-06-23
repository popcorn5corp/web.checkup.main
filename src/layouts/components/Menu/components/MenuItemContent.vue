<template>
  <div class="menu-item-content">
    <!-- <div class="menu-item"> -->
    <!-- <span class="menu-icon"> -->
    <!-- <i class="ri-vip-diamond-fill"></i> -->
    <!-- <user-outlined /> -->
    <LaptopOutlined />
    <!-- </span> -->
    <span class="menu-title">{{ props.item.meta?.title }}</span>
    <!-- <Badge text="new" size="small" shape="round" theme="primary-outline" /> -->
    <!-- <span v-if="props.item.meta?.isNew" class="badge primary">Hot</span> -->
  </div>
</template>

<script setup lang="ts" name="MenuItemContent">
import type { RouteRecordRaw } from 'vue-router'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue'
import Badge from '@/stories/Badge/Badge.vue'

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

  :deep(span.anticon.anticon-laptop) {
    // margin-inline-end: 10px;
    // margin-right: 0.5rem;
    // font-size: 0.8125rem;
    // line-height: 1;
    // background: rgba(108, 114, 147, 0.2);
    // width: 31px;
    // height: 31px;
    // border-radius: 100%;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // color: #ffffff;
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

  .badge {
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    color: #fff;
    background-color: #6c757d;

    &.primary {
      background-color: #ab2dff;
    }

    &.secondary {
      background-color: #079b0b;
    }
  }
}
</style>
