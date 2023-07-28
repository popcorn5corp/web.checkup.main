import { ref, watch, toRefs, unref } from 'vue'
import { defineStore } from 'pinia'
import {
  type ProjectConfigState,
  type ThemeConfig,
  DeviceTypeEnum,
  type ThemeName
} from '../interface'
import { DEFAULT_PRIMARY } from '@/constants/settings'
import { THEME_KEY } from '@/enums/cacheKeyEnum'
import { Storage } from '@/utils/storage'

const defaultConfig: ProjectConfigState = {
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
}

const styleDom = document.createElement('style')
styleDom.dataset.type = 'theme-dark'
// styleDom.textContent = darkThemeCss
document.head.appendChild(styleDom)

const setRealDarkTheme = (navTheme?: ThemeName) => {
  if (navTheme === 'realDark') {
    document.documentElement.classList.add('dark')
    styleDom.disabled = false
  } else {
    document.documentElement.classList.remove('dark')
    styleDom.disabled = true
  }
}

const getLocalTheme = (): ThemeConfig => {
  try {
    return JSON.parse(Storage.get(THEME_KEY, '{}'))
  } catch (e) {
    console.log(e)
    return defaultConfig.theme
  }
}

const localThemeConfig = getLocalTheme()
const { navTheme } = localThemeConfig
setRealDarkTheme(navTheme)

export const useProjectConfigStore = defineStore('projectConfig', () => {
  const config = ref<ProjectConfigState>({
    ...defaultConfig,
    theme: {
      ...defaultConfig.theme,
      ...localThemeConfig
    }
  })

  watch(
    () => [config.value.theme.navTheme, config.value.isCollapse],
    ([navTheme, isCollapse]) => {
      setLogo()
    },
    {
      immediate: true
    }
  )

  function setLogo() {
    let logoFileName = `${config.value.theme.title}_logo${
      config.value.isCollapse ? '_simple' : ''
    }_${config.value.theme.navTheme}.png`

    setTheme({ logoFileName })
  }

  function setCollapse(isCollapse: boolean) {
    config.value.isCollapse = isCollapse
  }

  function setTheme(theme: Partial<ThemeConfig>) {
    Object.entries(theme).map(([key]) => {
      const themeKey = key as keyof Partial<ThemeConfig>
      config.value.theme[themeKey] = theme[themeKey] as never
    })

    Storage.set(THEME_KEY, JSON.stringify(unref(config).theme))
  }

  return {
    config,
    setTheme,
    setCollapse
  }
})
