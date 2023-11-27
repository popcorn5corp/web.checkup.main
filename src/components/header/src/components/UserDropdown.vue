<template>
  <Dropdown class="user-dropdown" :trigger="['click']" :theme="'dark'">
    <Button shape="round">
      <template #icon>
        <Badge status="processing" text="체크업 주식회사" color="green" />
        <CaretDownOutlined />
      </template>
    </Button>
    <template #overlay>
      <Menu @click="onClickMenu">
        <MenuItem key="0" style="text-align: center">
          <Avatar style="background-color: #d7b0f4">
            <template #icon>
              <UserOutlined />
            </template>
          </Avatar>
        </MenuItem>
        <MenuItem key="1" style="text-align: center"> 체크업 주식회사 </MenuItem>
        <MenuItem key="2"> admin@checkupv.com </MenuItem>
        <MenuItem key="3">
          <PlusOutlined />
          {{ $t('common.createWorkspace') }}
        </MenuItem>
        <MenuItem key="4">
          <SwapOutlined />
          {{ $t('common.changeWorkspace') }}
        </MenuItem>
        <MenuItem key="5">
          <SettingOutlined />
          {{ $t('layout.header.dropdownItemSettings') }}
        </MenuItem>
        <!-- <MenuItem key="4">
          <UserOutlined />
          고객센터
        </MenuItem> -->
        <MenuItem key="6">
          <LogoutOutlined />
          {{ $t('layout.header.dropdownItemLogout') }}
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>

  <Modal
    v-model:open="isOpen"
    :title="$t('layout.header.dropdownItemSettings')"
    @ok="handleOk"
    :footer="false"
    width="800px"
  >
    <div class="modal-content">
      <Tabs :tabPosition="'left'">
        <TabPane key="1" :tab="$t('layout.header.settings.tabAccount')">
          <UserAccount />
        </TabPane>
        <TabPane key="2" :tab="$t('layout.header.settings.tabDisplaySetting')" force-render>
          <DisplaySetting />
        </TabPane>
        <TabPane key="3" :tab="$t('layout.header.settings.tabLang')">
          <LanguageSetting />
        </TabPane>
      </Tabs>
    </div>
  </Modal>
</template>
<script setup lang="ts" name="UserDropdown">
import router from '@/router'
import { AuthService } from '@/services'
import { Avatar, Badge, Dropdown, Menu, MenuItem, type MenuProps, Modal } from 'ant-design-vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/modules/auth'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { Button } from '@/components/button'
import {
  CaretDownOutlined,
  LogoutOutlined,
  PlusOutlined,
  SettingOutlined,
  SwapOutlined,
  UserOutlined
} from '@/components/icons'
import { Tabs } from '@/components/tabs'
import { TabPane } from '@/components/tabs'
import DisplaySetting from './DisplaySetting.vue'
import LanguageSetting from './LanguageSetting.vue'
import UserAccount from './UserAccount.vue'

const isOpen = ref(false)
const { t } = useI18n()
const { removeToken, removeUser, getUser } = useAuthStore()
const workspaceStore = useWorkspaceStore()

console.log(' [user] ', getUser)
// const isDarkMode = computed({
//   get() {
//     return config.theme.isDark
//   },
//   set(isDark) {
//     setTheme({ navTheme: isDark ? 'dark' : 'light', isDark })
//   }
// })

// const tabList: TabList = [
//   {
//     key: '1',
//     title: t('layout.header.settings.tabAccount'),
//     component: UserAccount,
//     closable: false
//   },
//   {
//     key: '2',
//     title: t('layout.header.settings.tabDisplaySetting'),
//     component: DisplaySetting,
//     closable: false
//   },
//   {
//     key: '3',
//     title: t('layout.header.settings.tabLang'),
//     component: LanguageSetting,
//     closable: false
//   }
// ]

const onClickMenu: MenuProps['onClick'] = (e) => {
  if (e.key === '3') {
    router.push({ name: 'workspace-create' })
    workspaceStore.setType('create')
  } else if (e.key === '4') {
    router.push({ name: 'workspace-list' })
    workspaceStore.setType('list')
  } else if (e.key === '5') {
    isOpen.value = true
  } else if (e.key === '6') {
    removeToken()
    removeUser()
    // AuthService.signOut()
    router.push({ name: 'login' })
  }
}

function handleOk(e: MouseEvent) {
  isOpen.value = false
}
</script>
<style lang="scss" scoped>
.user-dropdown {
  :deep(.ant-badge .ant-badge-status-dot) {
    width: 7px;
    height: 7px;
  }
}

.modal-content {
  margin-top: 30px;
}
</style>
