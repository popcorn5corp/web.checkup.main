<template>
  <ConfigProvider
    :theme="{
      algorithm: themeAlgorithm,
      token: {
        colorPrimary: getPrimaryColor
      }
    }"
  >
    <slot />
  </ConfigProvider>
</template>
<script setup lang="ts" name="App">
import { ConfigProvider } from 'ant-design-vue'
import { theme } from 'ant-design-vue'
import { computed, watch } from 'vue'
import { themeColors } from '@/config/default/themeConfig'
import { useTheme } from '@storybook/theming'

const { defaultAlgorithm, darkAlgorithm, defaultSeed } = theme

const props = defineProps<{
  theme: string
  colorPrimary: string
}>()

const { setTheme } = useTheme()
const getPrimaryColor = computed(() => {
  return themeColors.find((colorInfo) => props.colorPrimary === colorInfo.label).value
})

const customSeed = computed(() => {
  return {
    ...defaultSeed,
    colorPrimary: getPrimaryColor.value
  }
})

watch(
  () => props.colorPrimary,
  (val) => {
    setTheme({ primaryColor: getPrimaryColor.value })
  },
  { immediate: true }
)

const customDarkAlgorithm = () => {
  return {
    ...mergeToken.value,
    colorBgBase: 'rgba(40,42,66)',
    colorBgContainer: '#30334d',
    colorBgLayout: 'rgba(40,42,66)',
    colorBgElevated: '#30334d',
    colorBorder: '#ebebff45'
  }
}

const mergeToken = computed(() => darkAlgorithm(customSeed.value))
const themeAlgorithm = computed(() =>
  props.theme === 'realDark' ? customDarkAlgorithm : defaultAlgorithm
)
</script>
