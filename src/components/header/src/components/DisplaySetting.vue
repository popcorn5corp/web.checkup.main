<template>
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
  <Descriptions :title="$t('layout.header.settings.displaySettingMenuPosition')" :column="5">
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
      <RadioGroup v-model:value="config.theme.fontSize" @change="setLayoutFontSize">
        <Radio v-for="(item, i) in layoutFonts" :key="i" :value="item.value">{{
          item.label
        }}</Radio>
      </RadioGroup>
    </Descriptions.Item>
  </Descriptions>
</template>
<script lang="ts" setup name="DisplaySetting">
import {
  Descriptions,
  Radio,
  type RadioChangeEvent,
  RadioGroup,
  Tag,
  Tooltip
} from 'ant-design-vue'
import type { ThemeConfig } from '@/stores/interface'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { layoutFonts, menuLayouts, themeColors, themeStyle } from '@/config/default/themeConfig'

const { config, setTheme, setCollapse } = useProjectConfigStore()
const getThemeColorVisible = (color: string) =>
  config.theme.primaryColor === color ? 'visible' : 'hidden'

function setThemeColor(primaryColor: string) {
  setTheme({ primaryColor })
}

function setNavTheme(themeName: ThemeConfig['navTheme']) {
  setTheme({ navTheme: themeName })
}

function setMenuPosition(menuPosition: ThemeConfig['menuPosition']) {
  setTheme({ menuPosition })

  if (menuPosition === 'topmenu' && config.isCollapse) {
    setCollapse(false)
  }
}

function setLayoutFontSize({ target: { value } }: RadioChangeEvent) {
  setTheme({ fontSize: value })
}
</script>
<style lang="scss">
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
</style>
