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
import { type PropType, computed } from 'vue'
import { Menu } from 'ant-design-vue'
import MenuItemContent from './MenuItemContent.vue'
import type { RouteRecordRaw } from 'vue-router'

defineOptions({
  name: 'MenuItem'
})

const props = defineProps({
  menus: {
    type: Array as PropType<RouteRecordRaw[]>,
    default: () => []
  }
})

const filterMenus = computed(() => {
  return [...props.menus]
    .filter((n) => !n.meta?.hideInMenu)
    .sort((a, b) => ((a?.meta?.orderNum as any) || 0) - ((b?.meta?.orderNum as any) || 0))
})

console.log('filterMenus >> ', filterMenus)

const isShowSubMenu = (menuItem: RouteRecordRaw) => {
  return (
    menuItem?.meta?.type === 0 ||
    (!Object.is(menuItem?.meta?.hideChildrenInMenu, true) && menuItem?.children?.length)
  )
}
</script>

<style lang="scss" scoped></style>
