<template>
  <div class="tabs-container">
    <Tabs
      ref="tabsRef"
      v-model:activeKey="activeKey"
      hide-add
      type="editable-card"
      @change="onChangeTab"
      @edit="onEditTab"
      :style="tabsStyle"
    >
      <TabPane v-for="tab in tabsLyoutStore.getTabs" :key="tab.fullPath">
        <template #tab>
          <span>
            {{ tab.meta.title }}
          </span>
        </template>
      </TabPane>
    </Tabs>
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
import router from '@/router'
import { Util } from '@/utils'
import { Tabs } from 'ant-design-vue'
import Sortable from 'sortablejs'
import { type CSSProperties, computed, onMounted, onUnmounted, ref, unref, watch } from 'vue'
import { type RouteLocationNormalized, useRoute } from 'vue-router'
import type { RouteItem } from '@/stores/interface'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { useTabsLayoutStore } from '@/stores/modules/tabsLayout'
import { TABS_ROUTES_KEY } from '@/constants/cacheKeyEnum'

const { TabPane } = Tabs
const { Storage } = Util

const route = useRoute()
const tabsLyoutStore = useTabsLayoutStore()
const {
  config: { theme }
} = useProjectConfigStore()
const activeKey = ref(route.fullPath)
const newTabIndex = ref(0)
const tabsRef = ref()

const activeTabBorderColor = computed(() => theme.primaryColor)
const tabsStyle = computed<CSSProperties>(() => {
  return {
    backgroundColor: theme.navTheme !== 'realDark' ? 'rgba(255, 255, 255, 0.85)' : ''
  }
})

onMounted(() => {
  initTabs()
  tabsDrop()
})

const tabsDrop = () => {
  Sortable.create(tabsRef.value.$el.querySelector('.ant-tabs-nav-list') as HTMLElement, {
    draggable: 'ant-tabs-tab',
    animation: 300
    // onEnd({ newIndex, oldIndex }) {}
  })
}

watch(
  () => route.fullPath,
  (fullPath) => {
    tabsLyoutStore.addTab(getSimpleRoute(route))
    activeKey.value = fullPath
  },
  { immediate: true }
)

function initTabs(): void {
  let routes: RouteItem[] = []
  const routesStr = Storage.get(TABS_ROUTES_KEY)
  routes = routesStr ? JSON.parse(routesStr) : [getSimpleRoute(route)]
  tabsLyoutStore.initTabs(routes)
}

function getSimpleRoute(route: RouteLocationNormalized): RouteItem {
  const { fullPath, hash, meta, name, params, path, query } = route
  return { fullPath, hash, meta, name, params, path, query }
}

function onChangeTab(activeKey: Key): void {
  Object.is(route.fullPath, activeKey) || router.push(activeKey as string)
}

function removeTab(route: RouteItem): void {
  tabsLyoutStore.closeCurrentTab(route)
}

function saveTabs(): void {
  Storage.set(TABS_ROUTES_KEY, JSON.stringify(unref(tabsLyoutStore.getTabs)))
}

function onEditTab(e: Key | MouseEvent | KeyboardEvent, action: 'add' | 'remove'): void {
  if (action === 'remove') {
    const selectedTab = unref(tabsLyoutStore.getTabs).find((item) => item.fullPath === e)
    removeTab(selectedTab!)
  }
}

onMounted((): void => {
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
          border-radius: 0;
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
@/utils/storageUtil
