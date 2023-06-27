<template>
  <Layout.Header :style="headerStyle" class="layout-header">
    <Space :size="20">
      <slot>
        <Space :size="20">
          <!-- <span class="menu-fold" @click="() => emit('update:collapsed', !collapsed)"> -->
          <span class="menu-fold" @click="setCollapse(!props.collapsed)">
            <component :is="props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
          </span>
        </Space>
      </slot>
    </Space>
    <Space :size="20">
      <!-- <Search /> -->

      <!-- <FullScreen />
      <LocalePicker /> -->
      <!-- <span>Theme change Test</span> -->
      <a-switch size="small" v-model:checked="isDarkMode" />

      <!-- <Avatar style="background-color: #d7b0f4">
        <template #icon>
          <UserOutlined />
        </template>
      </Avatar> -->

      <!-- <Button label="김인수" shape="round">
        <template #icon>
          <CaretDownOutlined />
        </template>
      </Button> -->

      <a-dropdown>
        <a-button>
          체크업 주식회사
          <DownOutlined />
        </a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1">
              <UserOutlined />
              1st menu item
            </a-menu-item>
            <a-menu-item key="2">
              <UserOutlined />
              2nd menu item
            </a-menu-item>
            <a-menu-item key="3">
              <UserOutlined />
              3rd item
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>

      <!-- <DropdownMenu label="체크업 주식회사" /> -->

      <!-- <ProjectSetting /> -->
    </Space>
  </Layout.Header>
</template>

<script lang="tsx" setup>
import { computed, nextTick, ref, type CSSProperties, type PropType } from 'vue'
// import { useRouter, useRoute, RouteRecordRaw } from 'vue-router'
import { Button } from '@/stories'
import {
  QuestionCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
  LockOutlined,
  UserOutlined,
  DownOutlined,
  DownSquareFilled,
  DownCircleFilled,
  CaretDownOutlined
} from '@/components/Icon'

import {
  Layout,
  message,
  Modal,
  Dropdown,
  Menu,
  Space,
  Breadcrumb,
  Avatar,
  Tooltip,
  type MenuTheme
} from 'ant-design-vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { DropdownMenu } from '@/stories'

const props = defineProps({
  collapsed: {
    type: Boolean
  },
  theme: {
    type: String as PropType<MenuTheme>
  }
})
const emit = defineEmits(['update:collapsed'])

const { config, setCollapse, setTheme } = useProjectConfigStore()
const isDarkMode = computed({
  get() {
    return config.theme.isDark
  },
  set(isDark) {
    setTheme({ navTheme: isDark ? 'dark' : 'light', isDark })
  }
})
const headerStyle = computed<CSSProperties>(() => {
  const {
    theme: { navTheme, layout }
  } = config
  const isDark = navTheme === 'dark' && layout === 'topmenu'
  return {
    backgroundColor: navTheme === 'realDark' || isDark ? '' : 'rgba(255, 255, 255, 0.85)',
    color: isDark ? 'rgba(255, 255, 255, 0.85)' : ''
  }
})
</script>

<style lang="scss" scoped>
.layout-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  height: 55px;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;

  * {
    cursor: pointer;
  }
}
</style>
