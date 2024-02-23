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
import { computed } from 'vue'

// import { useProjectConfigStore } from '@/stores/modules/projectConfig'

const { defaultAlgorithm, darkAlgorithm, defaultSeed } = theme

// const { config, setTheme, setCollapse, setRealDarkTheme } = useProjectConfigStore()

const props = defineProps<{
  theme: string
  colorPrimary: string
}>()

interface themeType {
  label: string
  value: string
}

const themeColors: themeType[] = [
  {
    label: 'Daybreak',
    value: 'rgba(24, 144, 255, 1)'
  },
  {
    label: 'Dust',
    value: 'rgba(245, 34, 45, 1)'
  },
  {
    label: 'Volcano',
    value: 'rgba(250, 84, 28, 1)'
  },
  {
    label: 'Sunset',
    value: 'rgba(250, 173, 20, 1)'
  },
  {
    label: 'Cyan',
    value: 'rgba(19, 194, 194, 1)'
  },
  {
    label: 'Green',
    value: 'rgba(82, 196, 26, 1)'
  },
  {
    label: 'Geekblue',
    value: 'rgba(47, 84, 235, 1)'
  },
  {
    label: 'Purple',
    value: 'rgba(114, 46, 209, 1)'
  }
]

const getPrimaryColor = computed(() => {
  return themeColors.find((colorInfo) => props.colorPrimary === colorInfo.label).value
})

console.log(getPrimaryColor.value)

const customSeed = computed(() => {
  return {
    ...defaultSeed,
    colorPrimary: getPrimaryColor.value
  }
})

// watch(
//   () => props.colorPrimary,
//   (val) => {
//     setTheme({ primaryColor: getPrimaryColor.value })
//   },
//   { immediate: true }
// )

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
