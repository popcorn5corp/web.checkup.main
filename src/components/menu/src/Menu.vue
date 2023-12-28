<template>
  <div class="menu-container">
    <MenuHeader v-if="props.mode !== 'horizontal' && props.isSide" :collapsed="collapsed" />

    <div class="menu-content" :class="{ 'is-side-menu': props.isSide }">
      <Menu
        :ref="
          (ref) => {
            if (ref?.$el) {
              tourStore.addStep(2, ref?.$el)
            }
          }
        "
        v-model:selected-keys="state.selectedKeys"
        :open-keys="props.isSide ? state.openKeys : []"
        :mode="props.mode !== 'horizontal' && props.isSide ? 'inline' : 'horizontal'"
        :theme="theme"
        :collapsed="props.collapsed"
        @click="onClickMenuItem"
      >
        <MenuItem :menus="props.items" />
      </Menu>
    </div>

    <div class="menu-footer"></div>
  </div>
</template>

<script setup lang="ts" name="Menu">
import Menu from 'ant-design-vue/es/menu'
import { reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTourStore } from '@/stores/modules/tour'
// import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { RouteNameEnum } from '@/router/interface'
import type { MenuProps } from './'
import MenuHeader from './components/MenuHeader.vue'
import MenuItem from './components/MenuItem.vue'

const props = withDefaults(defineProps<MenuProps>(), {})
const currentRoute = useRoute()
const tourStore = useTourStore()
const router = useRouter()
const state = reactive({
  openKeys: [] as string[],
  selectedKeys: [currentRoute?.name || ''] as string[]
})

const getRouteByName = (name: string) => router?.getRoutes().find((n) => n.name === name)
const getTargetMenuByActiveMenuName = (activeMenu: string) => {
  return router?.getRoutes().find((n) => [n.name, n.path].includes(activeMenu))
}

const getOpenKeys = (): string[] => {
  // const meta = currentRoute?.meta
  const openKeys: string[] = []

  currentRoute?.matched.map((route) => {
    route.name && openKeys.push(route.name as string)
  })

  return openKeys
}

watch(
  () => props.collapsed,
  (collapsed) => {
    state.openKeys = collapsed ? [] : getOpenKeys()
    state.selectedKeys = [currentRoute?.name] as string[]
  }
)

watch(
  () => currentRoute?.fullPath,
  () => {
    if (currentRoute?.name === RouteNameEnum.LOGIN || props.collapsed) return
    state.openKeys = getOpenKeys()

    const meta = currentRoute?.meta
    if (meta?.activeMenu) {
      const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu as string)
      state.selectedKeys = [targetMenu?.name ?? meta?.activeMenu] as string[]
    } else {
      state.selectedKeys = [currentRoute?.meta?.activeMenu ?? currentRoute?.name] as string[]
    }
  },
  {
    immediate: true
  }
)

const onClickMenuItem = ({ key }: any) => {
  if (key === currentRoute?.name) return
  const targetRoute = getRouteByName(key)
  const { isExt, openMode } = targetRoute?.meta || {}
  if (isExt && openMode !== 2) {
    window.open(key)
  } else {
    router?.push({ name: key })
  }
}
</script>

<style lang="scss" scoped>
.menu-container {
  overflow: auto;
  .menu-content {
    overflow: auto;

    :deep(.ant-menu) {
      height: 100%;

      .ant-menu-sub-menu {
        .ant-menu-sub-menu-active {
          border: none;
        }
      }
    }

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    &.is-side-menu {
      height: calc(100vh - 325px);
    }
  }
}
</style>
