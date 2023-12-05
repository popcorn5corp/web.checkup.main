<template>
  <Dropdown class="user-dropdown" :trigger="['click']" :theme="'dark'">
    <Button shape="round">
      <template #icon>
        <Badge status="processing" :text="getWorkspace.workspaceName" color="green" />
        <CaretDownOutlined />
      </template>
    </Button>
    <template #overlay>
      <Menu @click="onClickMenu">
        <!-- <MenuItem key="0" style="text-align: center">
          <Avatar style="background-color: #d7b0f4">
            <template #icon>
              <UserOutlined />
            </template>
          </Avatar>
        </MenuItem>
        <MenuItem key="1" style="text-align: center"> {{ getUser.userName }} </MenuItem>
        <MenuItem key="2"> {{ getUser.userId }} </MenuItem> -->
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
        <MenuItem key="6">
          <UserOutlined />
          고객센터
        </MenuItem>
        <MenuItem key="7">
          <LogoutOutlined />
          {{ $t('layout.header.dropdownItemLogout') }}
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>

  <Modal
    v-model:open="isOpen"
    :title="$t('layout.header.dropdownItemSettings')"
    @ok="isOpen = false"
    :footer="false"
    width="800px"
  >
    <div class="modal-content">
      <Tabs :tabPosition="'left'">
        <TabPane key="1" :tab="$t('layout.header.settings.tabAccount')" force-render>
          <UserAccount />
        </TabPane>
        <TabPane key="2" :tab="$t('layout.header.settings.tabDisplaySetting')">
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
import { Avatar, Badge, Dropdown, Menu, MenuItem, type MenuProps, Modal } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
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
import { PageEnum } from '@/constants/pageEnum'
import DisplaySetting from './DisplaySetting.vue'
import LanguageSetting from './LanguageSetting.vue'
import UserAccount from './UserAccount.vue'

const authStore = useAuthStore()
const router = useRouter()
const { getWorkspace } = storeToRefs(useWorkspaceStore())
const isOpen = ref(false)

const onClickMenu: MenuProps['onClick'] = (e) => {
  if (e.key === '3') {
    router.push(PageEnum.WORKSPACE_CREATE)
  } else if (e.key === '4') {
    router.push(PageEnum.WORKSPACE_LIST)
  } else if (e.key === '5') {
    isOpen.value = true
  } else if (e.key === '7') {
    authStore.logout()
  }
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
