import { Util } from '@/utils'
import { defineStore } from 'pinia'
import { computed, ref, unref, watch } from 'vue'
import { THEME_KEY } from '@/constants/cacheKeyEnum'
import { DeviceTypeEnum, type ProjectConfigState, type ThemeConfig, type ThemeName } from './types'

// const DEFAULT_PRIMARY = 'rgba(24, 144, 255, 1)'
const DEFAULT_PRIMARY = '#1890ff'

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
    isRealDarkTheme: false,
    isDark: false,
    primaryColor: DEFAULT_PRIMARY, // '#F5222D', // primary color of ant design
    menuPosition: 'side', // nav menu position: `side` or `top`
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
document.head.appendChild(styleDom)

// const setRealDarkTheme = (navTheme?: ThemeName) => {
//   if (navTheme === 'realDark') {
//     document.documentElement.setAttribute('data-theme', 'dark')
//     styleDom.disabled = false
//   } else {
//     document.documentElement.removeAttribute('data-theme')
//     styleDom.disabled = true
//   }
// }

const setRealDarkTheme = (themeName: ThemeName) => {
  document.documentElement.setAttribute('data-theme', themeName)
  styleDom.disabled = false
}

const getLocalTheme = (): ThemeConfig => {
  try {
    return JSON.parse(Util.Storage.get(THEME_KEY, '{}'))
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

  const getTheme = computed(() => unref(config).theme)

  watch(
    () => [config.value.theme.navTheme, config.value.isCollapse],
    () => {
      setLogo()
    },
    { immediate: true }
  )

  function setLogo() {
    const {
      isCollapse,
      theme: { title, navTheme }
    } = unref(config)

    const logoFileName = `${title}_logo${isCollapse ? '_simple' : ''}_${navTheme}.png`
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

    Util.Storage.set(THEME_KEY, JSON.stringify(unref(config).theme))
  }

  return {
    config,
    getTheme,
    setTheme,
    setCollapse,
    setRealDarkTheme
  }
})
