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
import {
  Avatar,
  Badge,
  Dropdown,
  Menu,
  MenuItem,
  type MenuProps,
  Modal // Tabs
} from 'ant-design-vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/button'
import {
  CaretDownOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined
} from '@/components/icons'
import { type TabList, Tabs } from '@/components/tabs'
import { TabPane } from '@/components/tabs'
import DisplaySetting from './DisplaySetting.vue'
import LanguageSetting from './LanguageSetting.vue'
import UserAccount from './UserAccount.vue'

// const { TabPane } = Tabs
const activeKey = ref('2')
const isOpen = ref(false)
const { t } = useI18n()

// const isDarkMode = computed({
//   get() {
//     return config.theme.isDark
//   },
//   set(isDark) {
//     setTheme({ navTheme: isDark ? 'dark' : 'light', isDark })
//   }
// })

const tabList: TabList = [
  {
    key: '1',
    title: t('layout.header.settings.tabAccount'),
    component: UserAccount,
    closable: false
  },
  {
    key: '2',
    title: t('layout.header.settings.tabDisplaySetting'),
    component: DisplaySetting,
    closable: false
  },
  {
    key: '3',
    title: t('layout.header.settings.tabLang'),
    component: LanguageSetting,
    closable: false
  }
]

const onClickMenu: MenuProps['onClick'] = (e) => {
  if (e.key === '3') {
    isOpen.value = true
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

  .check-item {
    position: relative;
    cursor: pointer;

    &.active:after {
      content: '✔';
      position: absolute;
      bottom: 10px;
      right: 12px;
      color: blue;
    }
  }
}
</style>
