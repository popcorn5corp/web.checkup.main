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

const { defaultAlgorithm, darkAlgorithm, defaultSeed } = ATheme
const { getTheme, theme } = useTheme()
const { getAntdLocale } = useLocale()

watch(
  () => getTheme.value,
  (a) => {
    console.log('watch1 :: ', a)
  }
  // { immediate: true, deep: true }
)

// const theme = unref(getTheme)
const customSeed = computed(() => {
  const { primaryColor, fontSize } = unref(getTheme)

  return {
    ...defaultSeed,
    colorPrimary: primaryColor,
    fontSize
  }
})
const mergedToken = computed(() => darkAlgorithm(unref(customSeed)))
const themeAlgorithm = computed(() =>
  unref(getTheme).isDark ? customDarkAlgorithm : defaultAlgorithm
)

const customDarkAlgorithm = () => {
  return {
    ...unref(mergedToken),
    colorBgBase: 'rgba(40,42,66)',
    colorBgContainer: '#30334d',
    colorBgLayout: 'rgba(40,42,66)',
    colorBgElevated: '#30334d',
    colorBorder: '#ebebff45'
  }
}
</script>
