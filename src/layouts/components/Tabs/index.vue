<template>
  <div class="tabs-container">
    <a-tabs
      v-model:activeKey="activeKey"
      hide-add
      type="editable-card"
      @change="onChangeTab"
      @edit="onEditTab"
    >
      <a-tab-pane v-for="tab in tabs" :key="tab.fullPath" :tab="tab.meta.title" />
    </a-tabs>

    <div class="tabs-content">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <!-- <transition
            :name="Object.is(route.meta?.transitionName, false) ? '' : 'fade-transform'"
            mode="out-in"
            appear
          > -->
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
          <!-- </transition> -->
        </template>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts" name="Tabs">
import { ref, watch, computed, onUnmounted, unref, onMounted } from 'vue'
import { useRoute, type RouteLocationNormalized } from 'vue-router'
import { useTabsLayoutStore } from '@/stores/modules/tabsLayout'
import type { RouteItem } from '@/stores/interface'
import { Storage } from '@/utils/storage'
import { TABS_ROUTES_KEY } from '@/enums/cacheKeyEnum'
import router from '@/router'

const route = useRoute()
const tabsLyoutStore = useTabsLayoutStore()
const tabs = computed(() => tabsLyoutStore.getTabs())
const activeKey = ref(route.fullPath)
const newTabIndex = ref(0)

initTabs()

watch(
  () => route.fullPath,
  () => {
    tabsLyoutStore.addTab(getSimpleRoute(route))
    activeKey.value = route.fullPath
  },
  { immediate: true }
)

function initTabs() {
  let routes: RouteItem[] = []
  const routesStr = Storage.get(TABS_ROUTES_KEY)
  routes = routesStr ? JSON.parse(routesStr) : [getSimpleRoute(route)]
  tabsLyoutStore.initTabs(routes)
}

function getSimpleRoute(route: RouteLocationNormalized): RouteItem {
  const { fullPath, hash, meta, name, params, path, query } = route
  return { fullPath, hash, meta, name, params, path, query }
}

function onChangeTab(key: RouteItem['fullPath']) {
  Object.is(route.fullPath, key) || router.push(key)
}

function removeTab(route: RouteItem) {
  tabsLyoutStore.closeCurrentTab(route)
}

function saveTabs() {
  Storage.set(TABS_ROUTES_KEY, JSON.stringify(unref(tabs)))
}

function onEditTab(key: string, action: string) {
  if (action === 'remove') {
    const selectedTab = tabs.value.find((item) => item.fullPath === key)
    removeTab(selectedTab!)
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', saveTabs)
})

onUnmounted(() => {
  saveTabs()
})
</script>
<style lang="scss" scoped>
.tabs-container {
  :deep(.ant-tabs) {
    background-color: rgba(255, 255, 255, 0.85);

    &.ant-tabs-top {
      border-radius: 0;

      .ant-tabs-nav {
        margin: 0;
        height: 35px;
        line-height: 0px;
      }
    }
  }

  .tabs-content {
    height: calc(100vh - 104px);
  }
}
</style>
