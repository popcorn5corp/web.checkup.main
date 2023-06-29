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
      <a-switch size="small" v-model:checked="isDarkMode" />

      <Dropdown label="체크업 주식회사">
        <template #overlay>
          <a-menu @click="onClickMenu">
            <a-menu-item key="0" style="text-align: center">
              <Avatar style="background-color: #d7b0f4">
                <template #icon>
                  <UserOutlined />
                </template>
              </Avatar>
            </a-menu-item>
            <a-menu-item key="0" style="text-align: center"> 체크업 주식회사 </a-menu-item>
            <a-menu-item key="0"> admin@checkupv.com </a-menu-item>
            <a-menu-item key="1">
              <SettingOutlined />
              환경설정
            </a-menu-item>
            <a-menu-item key="2">
              <UserOutlined />
              고객센터
            </a-menu-item>
            <a-menu-item key="3">
              <LogoutOutlined />
              로그아웃
            </a-menu-item>
          </a-menu>
        </template>
      </Dropdown>
    </Space>
  </Layout.Header>

  <Modal v-model:open="isOpen" title="환경설정" @ok="handleOk" width="1000px">
    <Tabs v-model:active-key="activeKey" :tab-position="'left'">
      <TabPane key="1" tab="계정">계정</TabPane>
      <TabPane key="2" tab="디스플레이 설정" force-render>디스플레이 설정</TabPane>
      <TabPane key="3" tab="언어">언어</TabPane>
    </Tabs>
  </Modal>
</template>

<script lang="tsx" setup name="Header">
import { computed, type CSSProperties, type PropType, ref } from 'vue'
import { Dropdown } from '@/stories'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@/components/Icon'

import { Layout, Modal, Space, Avatar, Tabs, type MenuTheme, type MenuProps } from 'ant-design-vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
const { TabPane } = Tabs

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
const isOpen = ref(false)
const activeKey = ref('1')

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

const onClickMenu: MenuProps['onClick'] = (e) => {
  console.log('e', e)
  if (e.key === '1') {
    isOpen.value = true
  }
}

function handleOk(e: MouseEvent) {
  isOpen.value = false
}
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
