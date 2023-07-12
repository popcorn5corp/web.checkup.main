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
      <Tabs v-model:active-key="activeKey" :tab-position="'left'">
        <TabPane key="1" :tab="$t('layout.header.settings.tabAccount')"></TabPane>
        <TabPane key="2" :tab="$t('layout.header.settings.tabDisplaySetting')" force-render>
          <!-- <a-switch size="small" v-model:checked="isDarkMode" /> -->
          <Descriptions :title="$t('layout.header.settings.displaySettingTheme')" :column="5">
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
          <Descriptions
            :title="$t('layout.header.settings.displaySettingMenuPosition')"
            :column="5"
          >
            <Descriptions.Item v-for="item in menuLayouts" :key="item.value">
              <Tooltip :title="item.label">
                <div
                  class="check-item"
                  :class="{ active: config.theme.menuPosition === item.value }"
                  @click="setMenuPosition(item.value)"
                >
                  <SvgIcon :name="item.value" size="50" />
                </div>
              </Tooltip>
            </Descriptions.Item>
          </Descriptions>
          <Descriptions :title="$t('layout.header.settings.displaySettingColor')" :column="9">
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
          <Descriptions :title="$t('layout.header.settings.displaySettingFontSize')" :column="5">
            <Descriptions.Item>
              <a-radio-group v-model:value="config.theme.fontSize" @change="setLayoutFontSize">
                <a-radio v-for="item in layoutFonts" :value="item.value">{{ item.label }}</a-radio>
              </a-radio-group>
            </Descriptions.Item>
          </Descriptions>
        </TabPane>
        <TabPane key="3" :tab="$t('layout.header.settings.tabLang')">
          <LanguageSetting />
        </TabPane>
      </Tabs>
    </div>
  </Modal>
</template>
<script setup lang="ts" name="UserDropdown">
import { ref, computed } from 'vue'
import {
  type MenuProps,
  // Button,
  Dropdown,
  Tag,
  Tooltip,
  Descriptions,
  Tabs,
  Modal,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Select,
  type RadioChangeEvent
} from 'ant-design-vue'
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  CaretDownOutlined,
  SvgIcon
} from '@/components/Icon'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { Button } from '@/components/Button'
import type { Theme } from '@/stores/interface'
import { themeStyle, themeColors, menuLayouts, layoutFonts } from '@/config/default/themeConfig'
import LanguageSetting from './LanguageSetting.vue'
const { TabPane } = Tabs
const { Option } = Select

const { config, setTheme } = useProjectConfigStore()
const activeKey = ref('2')
const isOpen = ref(false)
const value1 = ref('jack')

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

function setNavTheme(themeName: Theme['navTheme']) {
  setTheme({ navTheme: themeName })
}

function setThemeColor(primaryColor: string) {
  setTheme({ primaryColor })
}

function setMenuPosition(menuPosition: Theme['menuPosition']) {
  setTheme({ menuPosition })
}

function setLayoutFontSize({ target: { value } }: RadioChangeEvent) {
  setTheme({ fontSize: value })
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
