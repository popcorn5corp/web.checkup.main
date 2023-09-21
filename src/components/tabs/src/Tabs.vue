<template>
  <div class="tabs-container">
    <Tabs v-model:activeKey="activeKey" :tabPosition="tabPosition" :type="type" @edit="onEdit">
      <template v-if="tabs">
        <template v-for="pane in tabs" :key="pane.key">
          <TabPane :closable="pane.closable">
            <template #tab>
              <span>
                <component :is="pane.icon" />
                {{ pane.title }}
              </span>
            </template>

            <!-- Component -->
            <component v-if="pane.component" :is="pane.component" />

            <!-- Content: Text... -->
            <div v-if="pane.content">{{ pane.content }}</div>
          </TabPane>
        </template>
      </template>
      <slot v-else />
    </Tabs>
  </div>
</template>
<script lang="ts" setup name="Tabs">
import { Tabs } from 'ant-design-vue'
import { ref, watch } from 'vue'
import type { TabList, TabsProps } from '../types'
import TabPane from './TabPane.vue'

const props = withDefaults(defineProps<TabsProps>(), {
  tabPosition: 'top',
  type: 'line'
})

const tabList = ref<TabList>([])
const activeKey = ref()
const newTabIndex = ref(0)

watch(
  () => props.tabs,
  (_tabs) => {
    if (_tabs) {
      tabList.value = _tabs
      activeKey.value = tabList.value[0].key
    }
  },
  {
    immediate: true
  }
)

const add = () => {
  activeKey.value = `newTab${++newTabIndex.value}`
  tabList.value.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey.value })
}

const remove = (targetKey: string) => {
  let lastIndex = 0
  tabList.value.forEach((pane, i) => {
    if (pane.key === targetKey) {
      lastIndex = i - 1
    }
  })
  tabList.value = tabList.value.filter((pane) => pane.key !== targetKey)
  if (tabList.value.length && activeKey.value === targetKey) {
    if (lastIndex >= 0) {
      activeKey.value = tabList.value[lastIndex].key
    } else {
      activeKey.value = tabList.value[0].key
    }
  }
}

const onEdit = (targetKey: Key | MouseEvent | KeyboardEvent, action: 'add' | 'remove') => {
  if (action === 'add') {
    add()
  } else {
    remove(targetKey as string)
  }
}
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
      }
    }
  }
}

// .tabs-container p {
//   margin: 0;
// }
// .tabs-container > .ant-tabs-card .ant-tabs-content {
//   height: 120px;
//   margin-top: -16px;
// }
.tabs-container .ant-tabs-content .ant-tabs-tabpane {
  padding: 16px;
  background: #fff;
}
// .tabs-container > .ant-tabs-card > .ant-tabs-nav::before {
//   display: none;
// }
// .tabs-container > .ant-tabs-card .ant-tabs-tab,
// [data-theme='compact'] .tabs-container > .ant-tabs-card .ant-tabs-tab {
//   background: transparent;
//   border-color: transparent;
// }
// .tabs-container > .ant-tabs-card .ant-tabs-tab-active,
// [data-theme='compact'] .tabs-container > .ant-tabs-card .ant-tabs-tab-active {
//   background: #fff;
//   border-color: #fff;
// }
// #components-tabs-demo-card-top .code-box-demo {
//   padding: 24px;
//   overflow: hidden;
//   background: #f5f5f5;
// }
// [data-theme='compact'] .tabs-container > .ant-tabs-card .ant-tabs-content {
//   height: 120px;
//   margin-top: -8px;
// }
// [data-theme='dark'] .tabs-container > .ant-tabs-card .ant-tabs-tab {
//   background: transparent;
//   border-color: transparent;
// }
// [data-theme='dark'] #components-tabs-demo-card-top .code-box-demo {
//   background: #000;
// }
// [data-theme='dark'] .tabs-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
//   background: #141414;
// }
// [data-theme='dark'] .tabs-container > .ant-tabs-card .ant-tabs-tab-active {
//   background: #141414;
//   border-color: #141414;
// }
</style>
