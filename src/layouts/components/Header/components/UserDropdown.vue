<template>
  <Dropdown :trigger="['click']" :theme="'dark'">
    <Button shape="round">
      <a-badge status="processing" text="체크업 주식회사" color="green" />

      <CaretDownOutlined />
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
          환경설정
        </MenuItem>
        <MenuItem key="4">
          <UserOutlined />
          고객센터
        </MenuItem>
        <MenuItem key="5">
          <LogoutOutlined />
          로그아웃
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>

  <Modal v-model:open="isOpen" title="환경설정" @ok="handleOk" width="800px">
    <div class="modal-content">
      <Tabs v-model:active-key="activeKey" :tab-position="'left'">
        <TabPane key="1" tab="계정">계정</TabPane>
        <TabPane key="2" tab="디스플레이 설정" force-render>
          <!-- <a-switch size="small" v-model:checked="isDarkMode" /> -->
          <Descriptions title="테마" :column="5">
            <Descriptions.Item v-for="theme in themeStyle" :key="theme.value">
              <Tooltip :title="theme.label">
                <div
                  class="check-item"
                  :class="{ active: config.theme.navTheme === theme.value }"
                  @click="setNavTheme(theme.value)"
                >
                  <SvgIcon :name="theme.value" size="50" />
                </div>
              </Tooltip>
            </Descriptions.Item>
          </Descriptions>
          <Descriptions title="색상" :column="9">
            <Descriptions.Item v-for="item in themeColors" :key="item.value">
              <div class="check-item">
                <Tooltip :title="item.label">
                  <Tag :color="item.value" @click="setThemeColor(item.value)">
                    <span :style="{ visibility: getThemeColorVisible(item.value) }"> ✔ </span>
                  </Tag>
                </Tooltip>
              </div>
            </Descriptions.Item>
          </Descriptions>
        </TabPane>
        <TabPane key="3" tab="언어">언어</TabPane>
      </Tabs>
    </div>
  </Modal>
</template>
<script setup lang="ts" name="UserDropdown">
import { ref, computed } from 'vue'
import {
  Button,
  Dropdown,
  Tag,
  Tooltip,
  Descriptions,
  Tabs,
  Modal,
  Menu,
  MenuItem,
  Avatar,
  type MenuProps
} from 'ant-design-vue'
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  CaretDownOutlined,
  SvgIcon
} from '@/components/Icon'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import type { Theme, ThemeName } from '@/stores/interface'
import { themeStyle, themeColors } from '@/config/default/themeConfig'
const { TabPane } = Tabs

const { config, setTheme } = useProjectConfigStore()
const activeKey = ref('2')
const isOpen = ref(false)
const isDarkMode = computed({
  get() {
    return config.theme.isDark
  },
  set(isDark) {
    setTheme({ navTheme: isDark ? 'dark' : 'light', isDark })
  }
})

const getThemeColorVisible = (color: string) =>
  config.theme.primaryColor === color ? 'visible' : 'hidden'

function setNavTheme(themeName: ThemeName) {
  console.log('setNavTheme ', themeName)

  setTheme({ navTheme: themeName })
}

function setThemeColor(primaryColor: string) {
  setTheme({ primaryColor })
}

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
