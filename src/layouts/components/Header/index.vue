<template>
  <Layout.Header :style="headerStyle" class="layout-header">
    <Space :size="20">
      <slot>
        <Space :size="20">
          <span class="menu-fold" @click="setCollapse(!props.collapsed)">
            <component :is="props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
          </span>
        </Space>
      </slot>
    </Space>
    <Space :size="20">
      <UserDropdown />
    </Space>
  </Layout.Header>
</template>

<script lang="ts" setup name="Header">
import { computed, type CSSProperties, type PropType } from 'vue'
import { Layout, Space, type MenuTheme } from 'ant-design-vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@/components/Icon'
import UserDropdown from './components/UserDropdown.vue'

const emit = defineEmits(['update:collapsed'])
const props = defineProps({
  collapsed: {
    type: Boolean
  },
  theme: {
    type: String as PropType<MenuTheme>
  }
})

const { config, setCollapse } = useProjectConfigStore()

const headerStyle = computed<CSSProperties>(() => {
  const {
    theme: { navTheme, layout }
  } = config
  // const isDark = navTheme === 'dark' && layout === 'topmenu'
  const isDark = navTheme === 'dark'
  return {
    backgroundColor: navTheme === 'realDark' ? '' : 'rgba(255, 255, 255, 0.85)'
  }
})
</script>

<style lang="scss" scoped>
.layout-header {
  position: sticky;
  top: 0;
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
