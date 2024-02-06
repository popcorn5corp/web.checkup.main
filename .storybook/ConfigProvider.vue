<template>
  <ConfigProvider
    :locale="getAntdLocale"
    :theme="{
      algorithm: themeAlgorithm,
    }"
  >
    <slot />
  </ConfigProvider>
</template>
<script setup lang="ts" name="App">

import { ConfigProvider } from 'ant-design-vue'
import { theme } from 'ant-design-vue'
import { computed } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { useLocale } from '@/locales/hooks/useLocale'

const { defaultAlgorithm, darkAlgorithm, defaultSeed } = theme

const props = defineProps<{
  theme: string
}>()

const { config } = useProjectConfigStore()
const customSeed = computed(() => {
  return {
    ...defaultSeed,
  }
})
const mergeToken = computed(() => darkAlgorithm(customSeed.value))
const themeAlgorithm = computed(() =>
props.theme=== 'realDark' ? customDarkAlgorithm : defaultAlgorithm
)

const { getAntdLocale } = useLocale()

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
</script>
