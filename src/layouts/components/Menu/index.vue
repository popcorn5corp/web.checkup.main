<template>
  <div class="menu-container">
    <!-- <a id="btn-collapse" class="sidebar-collapser"><i class="ri-arrow-left-s-line"></i></a> -->
    <MenuHeader v-if="isSideMenu" :collapsed="collapsed" />

    <!-- <a-divider style="height: 2px" /> -->
    <!-- <a-divider orientation="left">FMS</a-divider> -->
    <!-- <a-divider orientation="left" style="height: 2px; background: silver" plain>FMS</a-divider> -->
    <!-- <hr style="border-top: 3px solid #bbb" /> -->

    <div class="menu-content" :class="{ 'is-side-menu': isSideMenu }">
      <Menu
        v-model:selected-keys="state.selectedKeys"
        :open-keys="isSideMenu ? state.openKeys : []"
        :mode="isSideMenu ? 'inline' : 'horizontal'"
        :theme="theme"
        :collapsed="props.collapsed"
        @click="onClickMenuItem"
      >
        <MenuItem :menus="menuList" />
      </Menu>
    </div>

    <div class="menu-footer"></div>
  </div>
</template>

<script setup lang="ts" name="Menu">
import { reactive, computed, watch, type PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Menu, { type MenuTheme } from 'ant-design-vue/es/menu'
import MenuItem from './components/MenuItem.vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { RouteNameEnum } from '@/router/interface'
import MenuHeader from './components/MenuHeader.vue'
import { menus } from './mock'

const props = defineProps({
  collapsed: {
    type: Boolean
  },
  theme: {
    type: String as PropType<MenuTheme>
  }
})
const { config } = useProjectConfigStore()
const currentRoute = useRoute()
const router = useRouter()
const state = reactive({
  openKeys: [] as string[],
  selectedKeys: [currentRoute.name] as string[]
})

const menuList = computed(() => menus)
const isSideMenu = computed(() => config.theme.menuPosition === 'sidemenu')
const getRouteByName = (name: string) => router.getRoutes().find((n) => n.name === name)
const getTargetMenuByActiveMenuName = (activeMenu: string) => {
  return router.getRoutes().find((n) => [n.name, n.path].includes(activeMenu))
}

const getOpenKeys = (): string[] => {
  const meta = currentRoute.meta
  const openKeys: string[] = []

  currentRoute.matched.map((route) => {
    route.name && openKeys.push(route.name as string)
  })

  return openKeys
}

watch(
  () => props.collapsed,
  (collapsed) => {
    state.openKeys = collapsed ? [] : getOpenKeys()
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

const onClickMenuItem = ({ key }: any) => {
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

  .sidebar-collapser {
    -webkit-transition: left, right, 0.3s;
    transition: left, right, 0.3s;
    position: fixed;
    left: calc(250px - 50px);
    bottom: 40px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #00829f;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-size: 1.2em;
    -webkit-transform: translateX(50%);
    transform: translateX(50%);
    z-index: 111;
    cursor: pointer;
    color: white;
    -webkit-box-shadow: 1px 1px 4px #0c1e35;
    box-shadow: 1px 1px 4px #0c1e35;
  }
  // .text-divider {
  //   --text-divider-gap: 1rem;
  //   display: flex;
  //   align-items: center;
  //   font-size: 0.9375rem;
  //   text-transform: uppercase;
  //   letter-spacing: 0.1em;
  //   text-align: left;
  // }

  // .text-divider::before,
  // .text-divider::after {
  //   content: '';
  //   height: 1.5px;
  //   background-color: silver;
  //   flex-grow: 1;
  // }

  // .text-divider::before {
  //   margin-right: var(--text-divider-gap);
  // }

  // .text-divider::after {
  //   margin-left: var(--text-divider-gap);
  // }
  .menu-content {
    overflow: auto;
    // height: calc(100vh - 105px);
    height: 100vh;

    :deep(.ant-menu) {
      height: 100%;
      &.ant-menu-root {
        margin-top: 10px;
      }

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
      height: calc(100vh - 120px);
      // height: calc(100vh - 215px);
    }
  }
}
</style>
