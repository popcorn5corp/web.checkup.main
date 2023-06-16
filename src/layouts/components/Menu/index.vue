<template>
  <div class="menu-container" :class="{ 'is-side-menu': isSideMenu }">
    <Menu
      v-model:selected-keys="state.selectedKeys"
      :open-keys="isSideMenu ? state.openKeys : []"
      :mode="isSideMenu ? 'inline' : 'horizontal'"
      :theme="theme"
      :collapsed="props.collapsed"
      collapsible
      @click="clickMenuItem"
    >
      <MenuItem :menus="menuList" />
    </Menu>
  </div>
</template>

<script setup lang="ts" name="Menu">
import { reactive, computed, watch, type PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu, type MenuTheme } from 'ant-design-vue'
import MenuItem from './components/MenuItem.vue'
// import { useUserStore } from '@/store/modules/user'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { RouteNameEnum } from '@/router/interface'
import { menus } from './mock'

const props = defineProps({
  collapsed: {
    type: Boolean
  },
  theme: {
    type: String as PropType<MenuTheme>
  }
})
// const userStore = useUserStore()
const themeStore = useProjectConfigStore()
const currentRoute = useRoute()
const router = useRouter()
const state = reactive({
  openKeys: [] as string[],
  selectedKeys: [currentRoute.name] as string[]
})
const menuList = computed(() => menus)
const isSideMenu = computed(() => themeStore.config.theme.layout === 'sidemenu')
const getRouteByName = (name: string) => router.getRoutes().find((n) => n.name === name)
const getTargetMenuByActiveMenuName = (activeMenu: string) => {
  return router.getRoutes().find((n) => [n.name, n.path].includes(activeMenu))
}

const getOpenKeys = (): string[] => {
  const meta = currentRoute.meta

  console.log('getOpenKeys ', meta)

  if (meta?.activeMenu) {
    // const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu)
    // return targetMenu?.meta?.namePath ?? [meta?.activeMenu]
  }

  return (
    meta?.hideInMenu
      ? state?.openKeys || []
      : currentRoute.meta?.namePath ?? currentRoute.matched.slice(1).map((n) => n.name)
  ) as string[]
}

watch(
  () => props.collapsed,
  (newVal) => {
    state.openKeys = newVal ? [] : getOpenKeys()
    state.selectedKeys = [currentRoute.name] as string[]
  }
)

watch(
  () => currentRoute.fullPath,
  () => {
    if (currentRoute.name === RouteNameEnum.LOGIN || props.collapsed) return
    state.openKeys = getOpenKeys()
    const meta = currentRoute.meta
    if (meta?.activeMenu) {
      const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu as string)
      state.selectedKeys = [targetMenu?.name ?? meta?.activeMenu] as string[]
    } else {
      state.selectedKeys = [currentRoute.meta?.activeMenu ?? currentRoute.name] as string[]
    }
  },
  {
    immediate: true
  }
)

const clickMenuItem = ({ key }) => {
  console.log('')
  if (key === currentRoute.name) return
  const targetRoute = getRouteByName(key)
  const { isExt, openMode } = targetRoute?.meta || {}
  if (isExt && openMode !== 2) {
    window.open(key)
  } else {
    router.push({ name: key })
  }
}
</script>

<style lang="scss" scoped>
.menu-container {
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  &.is-side-menu {
    height: calc(100vh - 64px);
  }
}
</style>
