<template>
  <Descriptions :title="$t('layout.header.settings.displaySettingFontSize')" :column="5">
    <Descriptions.Item>
      <RadioGroup v-model:value="getTheme.fontSize" @change="setLayoutFontSize">
        <Radio v-for="(item, i) in layoutFonts" :key="i" :value="item.value">{{
          item.label
        }}</Radio>
      </RadioGroup>
    </Descriptions.Item>
  </Descriptions>
</template>

<script setup lang="ts" name="AccessibilitySetting">
import { Descriptions, Radio, type RadioChangeEvent, RadioGroup } from 'ant-design-vue'
import { useTheme } from '@/hooks/useTheme'
import { layoutFonts } from '@/config/default/themeConfig'

const { getTheme, setFontSize } = useTheme()
function setLayoutFontSize({ target: { value } }: RadioChangeEvent) {
  setFontSize(value)
}
</script>

<style lang="scss" scoped></style>
