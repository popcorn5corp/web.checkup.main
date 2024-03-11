import type { MenuTheme } from 'ant-design-vue'
import { defineStore, storeToRefs } from 'pinia'
import { unref } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { useTheme } from '@/hooks/useTheme'
import { DEFAULT_THEME_NAME } from '@/config/default/themeConfig'
import type { WorkspaceSettings } from '../workspace/types'

type DefaultThemeName = typeof DEFAULT_THEME_NAME
export type ThemeName = DefaultThemeName | 'semiDark' | 'dark'
export type MenuThemeName = MenuTheme
export type MenuPosition = 'side' | 'top'

export const useSettingStore = defineStore('setting', () => {
  const appStore = useAppStore()
  const workspaceStore = useWorkspaceStore()

  const { setCollapse } = appStore
  const { getCollapse } = storeToRefs(appStore)
  const { getWorkspace, getSettings } = storeToRefs(workspaceStore)
  const { setTheme, setHtmlDataTheme } = useTheme()

  async function _setSttings(values: Partial<WorkspaceSettings>) {
    if (unref(getWorkspace)?.workspaceId) {
      await workspaceStore.updateWorkspaceSettings(values)
    }
  }

  function setThemeName(themeName: ThemeName) {
    const menuThemeName: MenuThemeName =
      themeName === 'dark' || themeName === 'semiDark' ? 'dark' : 'light'

    setTheme({ themeName, menuThemeName, isDark: themeName === 'dark' })
    setHtmlDataTheme(themeName)

    _setSttings({
      display: {
        ...unref(getSettings).display,
        themeName,
        menuThemeName
      }
    }).then(() => {})
  }

  function setFontSize(fontSize: number) {
    setTheme({ fontSize })
    _setSttings({
      accessibility: {
        fontSize
      }
    }).then(() => {})
  }

  function setPrimaryColor(primaryColor: string) {
    setTheme({ primaryColor })
    _setSttings({
      display: {
        ...unref(getSettings).display,
        primaryColor
      }
    })
  }

  function setMenuPosition(menuPosition: MenuPosition) {
    setTheme({ menuPosition })
    _setSttings({
      display: {
        ...unref(getSettings).display,
        menuPosition
      }
    }).then(() => {
      if (menuPosition === 'top' && unref(getCollapse)) {
        setCollapse(false)
      }
    })
  }

  return {
    setThemeName,
    setFontSize,
    setPrimaryColor,
    setMenuPosition
  }
})
