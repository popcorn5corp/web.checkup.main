import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type ProjectConfigState, DeviceTypeEnum } from '../interface'
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
      navTheme: 'dark', // theme for nav menu
      primaryColor: 'rgb(24, 144, 255)', // '#F5222D', // primary color of ant design
      layout: 'sidemenu', // nav menu position: `sidemenu` or `topmenu`
      contentWidth: 'Fluid', // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
      fixedHeader: false, // sticky header
      fixSiderbar: false, // sticky siderbar
      colorWeak: false,
      menu: {
        locale: true
      },
      title: 'vite-antdv-admin',
      pwa: false,
      iconfontUrl: ''
    }
  })

  return {
    config
  }
})
