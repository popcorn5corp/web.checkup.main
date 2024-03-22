<template>
  <ConfigProvider
    :locale="getAntdLocale"
    :theme="{
      algorithm: themeAlgorithm,
      token: {
        colorPrimary: getTheme.primaryColor,
        fontSize: getTheme.fontSize
      }
    }"
  >
    <slot />
  </ConfigProvider>
</template>
<script setup lang="ts" name="AppProvider">
import { theme as ATheme, ConfigProvider } from 'ant-design-vue'
import { computed, unref, watch } from 'vue'
import { useTheme } from '@/hooks/useTheme'
import { useLocale } from '@/locales/hooks/useLocale'
import { useRoute } from 'vue-router'
import { themeBlackList } from './config/default/themeConfig'

const { defaultAlgorithm, darkAlgorithm, defaultSeed } = ATheme
const route = useRoute()
const { getTheme, initTheme } = useTheme()
const { getAntdLocale } = useLocale()

const customSeed = computed(() => {
  const { primaryColor, fontSize } = unref(getTheme)

  return {
    ...defaultSeed,
    colorPrimary: primaryColor,
    fontSize
  }
})

watch(
  () => route?.path,
  async (path) => {
    if (themeBlackList.includes(path)) {
      initTheme()
    }
  }
)

const themeAlgorithm = computed(() =>
  unref(getTheme).isDark ? customDarkAlgorithm : defaultAlgorithm
)

const customDarkAlgorithm = () => {
  const mergedToken = darkAlgorithm(unref(customSeed))

  return {
    ...mergedToken,
    colorBgBase: 'rgba(40,42,66)',
    colorBgContainer: '#30334d',
    colorBgLayout: 'rgba(40,42,66)',
    colorBgElevated: '#30334d',
    colorBorder: '#ebebff45'
  }
}
</script>
