import { storeToRefs } from 'pinia'
import { computed, ref, unref, watch, watchEffect } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { getDefaultWorkspaceSettings } from '@/stores/modules/workspace/data'
import type { WorkspaceSettings } from '@/stores/modules/workspace/types'
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_THEME_NAME
} from '@/config/default/themeConfig'

// const defaultConfig: ProjectConfigState = {
//   layout: 'default',
//   language: null,
//   maximize: false,
//   primary: DEFAULT_PRIMARY,
//   isDark: false,
//   isCollapse: false,
//   device: DeviceTypeEnum.Desktop,
//   theme: {
//     navTheme: 'light',
//     isRealDarkTheme: false,
//     isDark: false,
//     primaryColor: DEFAULT_PRIMARY, // '#F5222D', // primary color of ant design
//     menuPosition: 'sidemenu', // nav menu position: `sidemenu` or `topmenu`
//     contentWidth: 'Fluid', // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
//     fixedHeader: false, // sticky header
//     fixSiderbar: false, // sticky siderbar
//     colorWeak: false,
//     menu: {
//       locale: true
//     },
//     title: 'checkup',
//     pwa: false,
//     iconfontUrl: '',
//     logoFileName: '',
//     fontSize: 13
//   }
// }

type DefaultThemeName = typeof DEFAULT_THEME_NAME
export type ThemeName = DefaultThemeName | 'semiDark' | 'dark'
export type MenuThemeName = 'light' | 'dark'
export type MenuPosition = 'side' | 'top'

export interface ITheme {
  themeName: ThemeName
  menuThemeName: MenuThemeName
  isDark: boolean
  primaryColor: string
  menuPosition: MenuPosition
  title: string
  fontSize: number
}

const defaultTheme: ITheme = {
  themeName: 'light',
  menuThemeName: 'light',
  isDark: false,
  primaryColor: DEFAULT_PRIMARY_COLOR,
  menuPosition: 'side',
  title: 'checkup',
  fontSize: DEFAULT_FONT_SIZE
}

export const useTheme = () => {
  const { config, setCollapse } = useProjectConfigStore()
  const workspaceStore = useWorkspaceStore()
  const { getWorkspace } = storeToRefs(workspaceStore)
  const theme = ref<ITheme>(defaultTheme)
  const getTheme = computed(() => theme.value)
  const settings = ref(getDefaultWorkspaceSettings())

  watch(
    () => unref(getWorkspace)?.settings,
    (_settings) => {
      if (_settings) {
        settings.value = _settings

        const {
          display: { themeName, menuPosition, menuThemeName, primaryColor },
          accessibility: { fontSize }
        } = _settings

        theme.value = {
          ...defaultTheme,
          themeName,
          menuThemeName,
          menuPosition,
          isDark: themeName === 'dark',
          primaryColor,
          fontSize
        }
      }

      console.log('theme ::: ', theme.value)
    },
    {
      deep: true,
      immediate: true
    }
  )

  function initTheme() {
    watchEffect(() => {
      setDataTheme(theme.value.themeName || DEFAULT_THEME_NAME)
    })
  }

  function _setTheme(values: Partial<WorkspaceSettings>) {
    workspaceStore.setWorkspaceSettings(values)
  }

  function setThemeName(themeName: ThemeName) {
    _setTheme({
      display: {
        ...unref(settings).display,
        themeName
      }
    })
  }

  function setPrimaryColor(primaryColor: string) {
    _setTheme({
      display: {
        ...unref(settings).display,
        primaryColor
      }
    })
  }

  function setMenuPosition(menuPosition: MenuPosition) {
    _setTheme({
      display: {
        ...unref(settings).display,
        menuPosition
      }
    })

    if (menuPosition === 'top' && config.isCollapse) {
      setCollapse(false)
    }
  }

  const setDataTheme = (navTheme?: ThemeName) => {
    if (navTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }

  // console.log(getTheme)
  // const { config, setConfig } = useProjectConfigStore()
  // // const getTheme = computed(() => config.theme)
  // const getTheme = ref(config.theme)
  // function setTheme(theme: Partial<ThemeConfig>): void {
  //   Object.entries(theme).map(([key]) => {
  //     const themeKey = key as keyof Partial<ThemeConfig>
  //     // config.theme[themeKey] = theme[themeKey] as never
  //     setConfig({
  //       theme: {
  //         ...config.theme,
  //         [themeKey]: theme[themeKey]
  //       }
  //     })
  //   })
  // }
  return {
    initTheme,
    getTheme,
    setThemeName,
    setMenuPosition,
    setPrimaryColor
  }
}
