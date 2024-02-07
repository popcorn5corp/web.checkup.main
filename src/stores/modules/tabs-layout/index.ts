import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { LOGIN_NAME, PAGE_NOT_FOUND_NAME, REDIRECT_NAME } from '@/router/constant'
import type { RouteItem, TabsLayoutState } from './types'

const blackList = [REDIRECT_NAME, LOGIN_NAME, PAGE_NOT_FOUND_NAME] as const

export const useTabsLayoutStore = defineStore('tabsLayout', () => {
  const router = useRouter()
  const state = reactive<TabsLayoutState>({
    tabs: []
  })

  const getTabs = computed(() => state.tabs)

  // action
  function initTabs(routes: RouteItem[]) {
    state.tabs = routes
  }

  function getCurrentTab() {
    const currentRoute = router.currentRoute.value
    return state.tabs.find((item) => item.fullPath === currentRoute.fullPath)
  }

  function addTab(route: RouteItem) {
    if (blackList.includes(route.name as any)) return
    const isExists = state.tabs.some((item) => item.fullPath === route.fullPath)

    if (!isExists) {
      state.tabs.push(route)
    }
  }

  function closeCurrentTab(route: RouteItem) {
    const tabIndex = state.tabs.findIndex((item) => item.fullPath === route.fullPath)
    const isDelCurrentTab = Object.is(getCurrentTab(), state.tabs[tabIndex])
    state.tabs.splice(tabIndex, 1)

    if (isDelCurrentTab) {
      const currentRoute = state.tabs[Math.max(0, state.tabs.length - 1)]
      router.push(currentRoute)
    }
  }

  return {
    initTabs,
    getCurrentTab,
    getTabs,
    addTab,
    closeCurrentTab
  }
})
