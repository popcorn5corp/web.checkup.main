// import type { MenuTheme } from 'ant-design-vue'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { WorkspaceSettings } from '@/stores/modules/workspace/types'
import { PagePathEnum } from '@/constants/pageEnum'
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_THEME_NAME
} from '@/config/default/themeConfig'
import type { MenuPosition, MenuThemeName, ThemeName } from '@/config/default/themeConfig'

export interface ITheme {
  themeName: ThemeName
  menuThemeName: MenuThemeName
  isDark: boolean
  primaryColor: string
  menuPosition: MenuPosition
  title: string
  fontSize: number
}

const themeBlackList = [PagePathEnum.BASE_LOGIN] as string[]

export const defaultTheme: ITheme = {
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

function setTheme(values: Partial<ITheme>) {
  Object.entries(values).map(([k, v]) => {
    const key = k as keyof ITheme
    theme.value[key] = v as never
  })
}

function setInitTheme(settings: WorkspaceSettings) {
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

export function useTheme() {
  const route = useRoute()

  watch(
    () => route.path,
    async (path) => {
      if (themeBlackList.includes(path)) {
        setTheme({ ...defaultTheme })
      }
    }
  )

  return {
    theme,
    getTheme,
    setTheme,
    setInitTheme,
    setHtmlDataTheme
  }
}
