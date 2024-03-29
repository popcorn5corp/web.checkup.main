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

      <template #rightExtra>
        <TabOptionButton />
      </template>
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

<script setup lang="ts" name="LayoutTabs">
import router from '@/router'
import { Util } from '@/utils'
import { Tabs } from 'ant-design-vue'
import Sortable from 'sortablejs'
import { type CSSProperties, computed, onMounted, onUnmounted, ref, unref, watch } from 'vue'
import { type RouteLocationNormalized, useRoute } from 'vue-router'

import { useTabsLayoutStore } from '@/stores/modules/tabs-layout'
import type { RouteItem } from '@/stores/modules/tabs-layout/types'

import { useTheme } from '@/hooks/useTheme'

import { TABS_ROUTES_KEY } from '@/constants/cacheKeyEnum'

import TabOptionButton from './components/TabOptionButton.vue'

const { TabPane } = Tabs
const { Storage } = Util

const route = useRoute()
const tabsLyoutStore = useTabsLayoutStore()
const { getTheme } = useTheme()
const activeKey = ref(route.fullPath)
const tabsRef = ref()

const activeTabBorderColor = computed(() => unref(getTheme).primaryColor)
const tabsStyle = computed<CSSProperties>(() => {
  return {
    backgroundColor: unref(getTheme).themeName !== 'dark' ? 'rgba(255, 255, 255, 0.85)' : ''
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
    if (fullPath === '/' || fullPath.includes('/login') || fullPath.includes('/workspace')) {
      return
    }

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
      // border-radius: 0;
      border: 1px solid rgba(5, 5, 5, 0.06);

      .ant-tabs-nav {
        margin: 0;
        height: 35px;
        line-height: 0px;

        .ant-tabs-tab {
          // border-radius: 0;
          transition: all 0s cubic-bezier(0.645, 0.045, 0.355, 1);

          .ant-tabs-tab-remove {
            display: flex;
            padding: 0;
            margin: 0;

            .anticon-close {
              font-size: 13px;
              padding-left: 6px;
              padding-bottom: 1px;
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
              width: 20px;
              visibility: visible;
              padding-left: 6px;
            }
            .ant-tabs-tab-btn {
              color: v-bind(activeTabBorderColor);
            }
            .ant-tabs-tab-remove {
              width: unset;
            }
          }
        }

        .ant-tabs-tab-active {
          border-top: 2px solid v-bind(activeTabBorderColor);
        }

        .ant-tabs-extra-content {
          .option-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 43px;
            cursor: pointer;
            border-left: 1px solid rgba(5, 5, 5, 0.06);
            height: 35px;
          }
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
