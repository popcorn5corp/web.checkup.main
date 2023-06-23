import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import type { TabsLayoutState, RouteItem } from '../interface'
import { LOGIN_NAME, REDIRECT_NAME, PAGE_NOT_FOUND_NAME } from '@/router/constant'

export const blackList = [REDIRECT_NAME, LOGIN_NAME, PAGE_NOT_FOUND_NAME] as const

export const useTabsLayoutStore = defineStore('tabsLayout', () => {
  const router = useRouter()

  // state
  const state = reactive<TabsLayoutState>({
    tabs: []
  })

  // getter
  const tabs = computed(() => state.tabs)

  // action
  function initTabs(routes: RouteItem[]) {
    state.tabs = routes
  }

  function getCurrentTab() {
    const currentRoute = router.currentRoute.value
    return state.tabs.find((item) => item.fullPath === currentRoute.fullPath)
  }

  function getTabs() {
    return state.tabs
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
    tabs,
    initTabs,
    getCurrentTab,
    getTabs,
    addTab,
    closeCurrentTab
  }
})
