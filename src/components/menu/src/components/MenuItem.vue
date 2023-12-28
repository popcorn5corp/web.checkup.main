<template>
  <template v-for="item in filterMenus" :key="item.name || item.fullPath">
    <template v-if="isShowSubMenu(item)">
      <Menu.SubMenu :key="item?.name" v-bind="$attrs">
        <template #title>
          <MenuItemContent :item="item" />
        </template>
        <template v-if="item.children">
          <MenuItem :menus="item.children" />
        </template>
      </Menu.SubMenu>
    </template>
    <template v-else>
      <Menu.Item :key="item?.name">
        <MenuItemContent :item="item" />
      </Menu.Item>
    </template>
  </template>
</template>

<script setup lang="ts" name="MenuItem">
import { Menu } from 'ant-design-vue'
import { computed } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import MenuItemContent from './MenuItemContent.vue'

interface Props {
  menus: RouteRecordRaw[]
}

const props = withDefaults(defineProps<Props>(), { menus: () => [] })
const filterMenus = computed(() => {
  return [...props.menus]
    .filter((n) => !n.meta?.hideInMenu)
    .sort((a, b) => ((a?.meta?.orderNum as any) || 0) - ((b?.meta?.orderNum as any) || 0))
})

const isShowSubMenu = (menuItem: RouteRecordRaw) => {
  return (
    menuItem?.meta?.type === 0 ||
    (!Object.is(menuItem?.meta?.hideChildrenInMenu, true) && menuItem?.children?.length)
  )
}
</script>

<style lang="scss" scoped>
:deep(.ant-menu-submenu) {
  .ant-menu-submenu-selected {
    color: red;
    border-bottom: 2px solid red;
  }
}

:deep(.ant-menu-title-content) {
  span.anticon {
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
}
</style>
