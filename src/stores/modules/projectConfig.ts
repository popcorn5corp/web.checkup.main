import { ref, watch, toRefs } from 'vue'
import { defineStore } from 'pinia'
import { type ProjectConfigState, type Theme, DeviceTypeEnum } from '../interface'
import { DEFAULT_PRIMARY } from '@/constants/settings'

export const useProjectConfigStore = defineStore('projectConfig', () => {
  const config = ref<ProjectConfigState>({
    layout: 'default',
    language: null,
    maximize: false,
    primary: DEFAULT_PRIMARY,
    isDark: false,
    isCollapse: false,
    device: DeviceTypeEnum.Desktop,
    theme: {
      navTheme: 'light',
      isDark: false,
      primaryColor: 'rgb(24, 144, 255)', // '#F5222D', // primary color of ant design
      menuPosition: 'sidemenu', // nav menu position: `sidemenu` or `topmenu`
      contentWidth: 'Fluid', // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
      fixedHeader: false, // sticky header
      fixSiderbar: false, // sticky siderbar
      colorWeak: false,
      menu: {
        locale: true
      },
      title: 'checkup',
      pwa: false,
      iconfontUrl: '',
      logoFileName: '',
      fontSize: 13
    }
  })

  watch(
    () => [config.value.theme.navTheme, config.value.isCollapse],
    ([navTheme, isCollapse]) => {
      let logoFileName = `${config.value.theme.title}_logo${
        isCollapse ? '_simple' : ''
      }_${navTheme}.png`

      setTheme({ logoFileName })
    },
    {
      immediate: true
    }
  )

  function setCollapse(isCollapse: boolean) {
    config.value.isCollapse = isCollapse
  }

  function setTheme(theme: Partial<Theme>) {
    Object.entries(theme).map(([key]) => {
      const themeKey = key as keyof Partial<Theme>
      config.value.theme[themeKey] = theme[themeKey] as never
    })
  }

  return {
    config,
    setTheme,
    setCollapse
  }
})
