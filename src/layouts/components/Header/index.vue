<template>
  <Layout.Header :style="headerStyle" class="layout-header">
    <Space :size="20">
      <slot>
        <Space :size="20">
          <span class="menu-fold" @click="() => emit('update:collapsed', !collapsed)">
            <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
          </span>
        </Space>
      </slot>
    </Space>
    <Space :size="20">
      <Search />

      <FullScreen />
      <LocalePicker />

      <Avatar style="background-color: #d7b0f4">
        <template #icon>
          <UserOutlined />
        </template>
      </Avatar>

      <ProjectSetting />
    </Space>
  </Layout.Header>
</template>

<script lang="tsx" setup>
import { computed, nextTick, type CSSProperties, type PropType } from 'vue'
// import { useRouter, useRoute, RouteRecordRaw } from 'vue-router'
import {
  QuestionCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
  LockOutlined,
  UserOutlined
} from '@ant-design/icons-vue'
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

defineProps({
  collapsed: {
    type: Boolean
  },
  theme: {
    type: String as PropType<MenuTheme>
  }
})
const emit = defineEmits(['update:collapsed'])

const projectConfigStore = useProjectConfigStore()
const headerStyle = computed<CSSProperties>(() => {
  const {
    config: {
      theme: { navTheme, layout }
    }
  } = projectConfigStore
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
  height: 64px;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;

  * {
    cursor: pointer;
  }
}
</style>
