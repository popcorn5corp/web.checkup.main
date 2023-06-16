<template>
  <Layout.Header :style="headerStyle" class="layout-header">
    <Space :size="20">
      <slot>
        <!-- <Space :size="20">
          <span class="menu-fold" @click="() => emit('update:collapsed', !collapsed)">
            <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
          </span>
          <Breadcrumb>
            <template v-for="(routeItem, rotueIndex) in menus" :key="routeItem?.name">
              <Breadcrumb.Item>
                <TitleI18n :title="routeItem?.meta?.title" />
                <template v-if="routeItem?.children?.length" #overlay>
                  <Menu :selected-keys="getSelectKeys(rotueIndex)">
                    <template v-for="childItem in routeItem?.children" :key="childItem.name">
                      <Menu.Item
                        v-if="!childItem.meta?.hideInMenu && !childItem.meta?.hideInBreadcrumb"
                        :key="childItem.name"
                        @click="clickMenuItem(childItem)"
                      >
                        <TitleI18n :title="childItem.meta?.title" />
                      </Menu.Item>
                    </template>
                  </Menu>
                </template>
              </Breadcrumb.Item>
            </template>
          </Breadcrumb>
        </Space> -->
      </slot>
    </Space>
    <Space :size="20">
      <!-- <Search />
      <Tooltip :title="$t('layout.header.tooltipLock')" placement="bottom">
        <LockOutlined @click="lockscreenStore.setLock(true)" />
      </Tooltip>
      <FullScreen />
      <LocalePicker />
      <Dropdown placement="bottomRight">
        <Avatar :src="userInfo.headImg" :alt="userInfo.name">{{ userInfo.name }}</Avatar>
        <template #overlay>
          <Menu>
            <Menu.Item @click="$router.push({ name: 'account-about' })">
              {{ $t('routes.account.about') }}
            </Menu.Item>
            <Menu.Item @click="$router.push({ name: 'account-settings' })">
              {{ $t('routes.account.settings') }}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
              <div @click.prevent="doLogout">
                <poweroff-outlined /> {{ $t('layout.header.dropdownItemLoginOut') }}
              </div>
            </Menu.Item>
          </Menu>
        </template>
      </Dropdown>
      <ProjectSetting /> -->
    </Space>
  </Layout.Header>
</template>

<script lang="tsx" setup>
import { computed, nextTick, type CSSProperties } from 'vue'
// import { useRouter, useRoute, RouteRecordRaw } from 'vue-router'
import {
  QuestionCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
  LockOutlined
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
// import { Search, FullScreen, ProjectSetting } from './components/'
// import { LocalePicker } from '@/components/basic/locale-picker'
// import { useUserStore } from '@/store/modules/user'
// import { useKeepAliveStore } from '@/store/modules/keepAlive'
// import { useLockscreenStore } from '@/store/modules/lockscreen'
// import { LOGIN_NAME } from '@/router/constant'
// import { TitleI18n } from '@/components/basic/title-i18n'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'

// defineProps({
//   collapsed: {
//     type: Boolean
//   },
//   theme: {
//     type: String as PropType<MenuTheme>
//   }
// })
// const emit = defineEmits(['update:collapsed'])
// const userStore = useUserStore()
// const themeStore = useThemeStore()
// const lockscreenStore = useLockscreenStore()
// const keepAliveStore = useKeepAliveStore()

// const router = useRouter()
// const route = useRoute()
// const userInfo = computed(() => userStore.userInfo)
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
