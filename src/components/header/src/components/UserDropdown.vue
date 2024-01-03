<template>
  <Dropdown class="user-dropdown" :trigger="['click']">
    <Button
      shape="round"
      :ref="
        (ref) => {
          // @ts-ignore
          if (ref?.$el) {
            // @ts-ignore
            tourStore.addStep(1, ref.$el)
          }
        }
      "
    >
      <template #icon>
        <Badge status="processing" :text="getWorkspace?.workspaceName" color="green" />
        <CaretDownOutlined />
      </template>
    </Button>
    <template #overlay>
      <Menu @click="onClickMenu">
        <MenuItem key="1">
          <PlusOutlined />
          {{ $t('common.createWorkspace') }}
        </MenuItem>
        <MenuItem key="2">
          <SwapOutlined />
          {{ $t('common.changeWorkspace') }}
        </MenuItem>
        <MenuItem key="3">
          <SettingOutlined />
          {{ $t('layout.header.dropdownItemSettings') }}
        </MenuItem>
        <!-- <MenuItem key="4">
          <UserOutlined />
          고객센터
        </MenuItem> -->
        <MenuItem key="5">
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
        <TabPane key="2" :tab="$t('layout.header.settings.tabAlarm')">
          <AlarmSetting />
        </TabPane>
        <TabPane key="3" :tab="$t('layout.header.settings.tabDisplaySetting')">
          <DisplaySetting />
        </TabPane>
        <TabPane key="4" :tab="$t('layout.header.settings.tabLangRegion')">
          <LanguageSetting />
        </TabPane>
      </Tabs>
    </div>
  </Modal>
</template>
<script setup lang="ts" name="UserDropdown">
import { Badge, Dropdown, Menu, MenuItem, type MenuProps, Modal } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'
import { useTourStore } from '@/stores/modules/tour'
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
import { PagePathEnum } from '@/constants/pageEnum'
import DisplaySetting from './DisplaySetting.vue'
import LanguageSetting from './LanguageSetting.vue'

const authStore = useAuthStore()
const router = useRouter()
const workspaceStore = useWorkspaceStore()
const { getWorkspace } = storeToRefs(workspaceStore)
const tourStore = useTourStore()
const isOpen = ref(false)

const onClickMenu: MenuProps['onClick'] = ({ key }) => {
  if (key === '1') {
    router.push(PagePathEnum.WORKSPACE_CREATE)
  } else if (key === '2') {
    router.push(PagePathEnum.WORKSPACE_LIST)
  } else if (key === '3') {
    isOpen.value = true
  } else if (key === '5') {
    authStore.logout(true)
  }
}

const handleDropdown = () => {}
const openChange = () => {}
</script>
<style lang="scss" scoped>
.user-dropdown {
  :deep(.ant-badge .ant-badge-status-dot) {
    width: 8px;
    height: 8px;
  }
}

.modal-content {
  margin-top: 30px;

  :deep(.tabs-container) {
    border-radius: 15px;

    .ant-tabs-content-holder {
      padding: 10px;
    }
  }
}
</style>
