<template>
  <ConfigProvider
    :locale="getAntdLocale"
    :theme="{
      algorithm: themeAlgorithm,
      token: {
        colorPrimary: theme.primaryColor,
        fontSize: theme.fontSize
      }
    }"
  >
    <slot />
  </ConfigProvider>
</template>
<script setup lang="ts" name="AppProvider">
import { theme as ATheme, ConfigProvider } from 'ant-design-vue'
import { computed, unref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { defaultTheme, useTheme } from '@/hooks/useTheme'
import { useLocale } from '@/locales/hooks/useLocale'
import { PagePathEnum } from './constants/pageEnum'
import { Helper } from './helpers'

const themeBlackList = [PagePathEnum.BASE_LOGIN] as string[]

const { defaultAlgorithm, darkAlgorithm, defaultSeed } = ATheme
const route = useRoute()
const { getTheme, setHtmlDataTheme } = useTheme()
const { getAntdLocale, setLocale } = useLocale()
const theme = computed({
  get: () => getTheme.value,
  set() {}
})

const customSeed = computed(() => {
  const { primaryColor, fontSize } = unref(theme)

  return {
    ...defaultSeed,
    colorPrimary: primaryColor,
    fontSize
  }
})
const themeAlgorithm = computed(() =>
  unref(theme).isDark ? customDarkAlgorithm : defaultAlgorithm
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

watch(
  () => route.path,
  (path) => {
    if (themeBlackList.includes(path)) {
      initTheme()
    }
  }
)

function initTheme() {
  const { primaryColor, themeName, isDark } = defaultTheme
  theme.value.primaryColor = primaryColor
  theme.value.themeName = themeName
  theme.value.isDark = isDark
  setHtmlDataTheme(themeName)
  setLocale(Helper.Locale.locales.browserLanguage)
}
</script>
