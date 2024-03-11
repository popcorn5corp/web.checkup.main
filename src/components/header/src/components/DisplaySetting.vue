<template>
  <Descriptions :title="$t('layout.header.settings.displaySettingTheme')" :column="5">
    <Descriptions.Item v-for="theme in themeStyle" :key="theme.value" class="margin">
      <Tooltip :title="theme.label">
        <div
          class="check-item"
          :class="{ active: getTheme.themeName === theme.value }"
          @click="setThemeName(theme.value)"
        >
          <SvgIcon :name="theme.value" size="50" />
        </div>
      </Tooltip>
    </Descriptions.Item>
  </Descriptions>

  <Descriptions
    v-if="!getSettings.isMobile"
    :title="$t('layout.header.settings.displaySettingMenuPosition')"
    :column="5"
  >
    <Descriptions.Item v-for="item in menuLayouts" :key="item.value" class="margin">
      <Tooltip :title="item.label">
        <div
          class="check-item"
          :class="{ active: getTheme.menuPosition === item.value }"
          @click="setMenuPosition(item.value)"
        >
          <SvgIcon :name="item.value + 'menu'" size="50" />
        </div>
      </Tooltip>
    </Descriptions.Item>
  </Descriptions>

  <Descriptions :title="$t('layout.header.settings.displaySettingColor')" :column="9">
    <Descriptions.Item v-for="item in themeColors" :key="item.value">
      <div class="check-item">
        <Tooltip :title="item.label">
          <Tag :color="item.value" @click="setPrimaryColor(item.value)">
            <span
              :style="{ visibility: getTheme.primaryColor === item.value ? 'visible' : 'hidden' }"
            >
              ✔
            </span>
          </Tag>
        </Tooltip>
      </div>
    </Descriptions.Item>
  </Descriptions>
</template>
<script setup lang="ts" name="DisplaySetting">
import { Descriptions, Tag, Tooltip } from 'ant-design-vue'
import { useAppStore } from '@/stores/modules/app'
import { useTheme } from '@/hooks/useTheme'
import { menuLayouts, themeColors, themeStyle } from '@/config/default/themeConfig'
import { useSettingStore } from '@/stores/modules/setting'
// // TODO
// import { useDevice } from '@/hooks/useDevice'

const { getSettings } = useAppStore()
const { setThemeName, setPrimaryColor, setMenuPosition } = useSettingStore()
const { getTheme } = useTheme()

</script>
<style lang="scss" scoped>
.check-item {
  position: relative;
  cursor: pointer;

  &.active:after {
    content: '✔';
    position: absolute;
    bottom: 10px;
    right: 12px;
    color: $color-gray-7;
  }
}
:deep(.ant-descriptions-row) {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
:deep(.ant-descriptions-item.margin) {
  margin-right: 15px;
}
</style>
