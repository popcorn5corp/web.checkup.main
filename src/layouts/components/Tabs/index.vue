<template>
  <div class="tabs-container">
    <a-tabs
      v-model:activeKey="activeKey"
      hide-add
      type="editable-card"
      @change="onChangeTab"
      @edit="onEditTab"
      :style="tabsStyle"
    >
      <a-tab-pane v-for="tab in tabs" :key="tab.fullPath" :tab="tab.meta.title" />
    </a-tabs>

    <!-- <div class="tabs-content">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <transition
            :name="Object.is(route.meta?.transitionName, false) ? '' : 'fade-transform'"
            mode="out-in"
            appear
          >
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </template>
      </router-view>
    </div> -->
  </div>
</template>

<script setup lang="ts" name="Tabs">
import { ref, watch, computed, onUnmounted, unref, onMounted, type CSSProperties } from 'vue'
import { useRoute, type RouteLocationNormalized } from 'vue-router'
import { useTabsLayoutStore } from '@/stores/modules/tabsLayout'
import type { RouteItem } from '@/stores/interface'
import { Storage } from '@/utils/storage'
import { TABS_ROUTES_KEY } from '@/enums/cacheKeyEnum'
import router from '@/router'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'

const route = useRoute()
const tabsLyoutStore = useTabsLayoutStore()
const {
  config: { theme }
} = useProjectConfigStore()
const tabs = computed(() => tabsLyoutStore.getTabs())
const activeKey = ref(route.fullPath)
const newTabIndex = ref(0)

initTabs()

const activeTabBorderColor = computed(() => theme.primaryColor)
const tabsStyle = computed<CSSProperties>(() => {
  return {
    backgroundColor: theme.navTheme !== 'realDark' ? 'rgba(255, 255, 255, 0.85)' : ''
  }
})

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

function onChangeTab(key: string) {
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
    &.ant-tabs-top {
      border-radius: 0;

      .ant-tabs-nav {
        margin: 0;
        height: 35px;
        line-height: 0px;

        .ant-tabs-tab {
          transition: all 0s cubic-bezier(0.645, 0.045, 0.355, 1);

          .ant-tabs-tab-remove {
            display: flex;
            padding: 0;
            margin: 0;

            .anticon-close {
              padding-left: 6px;
            }
          }

          .ant-tabs-tab-btn {
            transition: all 0s;
          }
        }

        .ant-tabs-tab:not(.ant-tabs-tab-active) {
          .ant-tabs-tab-remove {
            width: 0;
          }

          .anticon-close {
            width: 0;
            visibility: hidden;
            transition: width 0.3s;
          }

          &:hover {
            .anticon-close {
              width: 16px;
              visibility: visible;
              padding-left: 6px;
            }

            .ant-tabs-tab-remove {
              width: unset;
            }
          }
        }

        .ant-tabs-tab-active {
          border-top: 2px solid v-bind(activeTabBorderColor);
        }
      }
    }
  }

  .tabs-content {
    height: calc(100vh - 104px);
  }
}
</style>
