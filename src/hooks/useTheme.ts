import { computed, ref } from 'vue'
import { DEFAULT_FONT_SIZE, DEFAULT_PRIMARY_COLOR } from '@/config/default/themeConfig'
import type { MenuPosition, MenuThemeName, ThemeName } from '@/config/default/themeConfig'
import type { WorkspaceSettings } from '@/stores/modules/workspace/types'

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
} as const

const theme = ref<ITheme>({ ...defaultTheme })
const getTheme = computed(() => theme.value)
const getDefaultTheme = () => defaultTheme

function setTheme(values: Partial<ITheme>) {
  theme.value = {
    ...theme.value,
    ...values
  }
}

function setThemeBySettings(settings: WorkspaceSettings) {
  const {
    display: { themeName, menuPosition, menuThemeName, primaryColor },
    accessibility: { fontSize }
  } = settings

  setTheme({
    ...defaultTheme,
    themeName,
    menuThemeName,
    menuPosition,
    isDark: themeName === 'dark',
    primaryColor,
    fontSize
  })

  setHtmlDataTheme(themeName)
}

function setHtmlDataTheme(themeName: ThemeName) {
  document.documentElement.setAttribute('data-theme', themeName)
}

function initTheme() {
  setTheme(getDefaultTheme())
  setHtmlDataTheme('light')
}

export function useTheme() {
  return {
    theme,
    getTheme,
    getDefaultTheme,
    initTheme,
    setTheme,
    setThemeBySettings,
    setHtmlDataTheme
  }
}
