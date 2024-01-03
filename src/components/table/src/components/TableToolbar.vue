<template>
  <div class="table-toolbar-container">
    <Input
      class="search"
      v-model:value="searchWord"
      :placeholder="phText || $t('common.searchPlaceholder')"
      @change="onChange"
      @press-enter="onSearch"
      allow-clear
    >
      <template #prefix>
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" @click="onSearch" />
      </template>
    </Input>

    <Space class="settings">
      <Tooltip placement="top">
        <template #title>
          <span>Reload</span>
        </template>
        <Button
          :label="''"
          size="middle"
          @click="onReload"
          :ref="
            (ref) => {
              // @ts-ignore
              if (ref?.$el) {
                // @ts-ignore
                tourStore.addStep(6, ref.$el)
              }
            }
          "
        >
          <template #icon>
            <font-awesome-icon icon="rotate" :class="[isReload && 'rotating']" />
          </template>
        </Button>
      </Tooltip>

      <Tooltip placement="top">
        <template #title>
          <span>Full Download</span>
        </template>
        <Button
          :label="''"
          size="middle"
          :ref="
            (ref) => {
              // @ts-ignore
              if (ref?.$el) {
                // @ts-ignore
                tourStore.addStep(7, ref.$el)
              }
            }
          "
        >
          <template #icon>
            <DownloadOutlined />
          </template>
        </Button>
      </Tooltip>

      <Tooltip placement="top">
        <template #title>
          <span>Size</span>
        </template>
        <Dropdown :trigger="['click']">
          <Button
            size="middle"
            :ref="
              (ref) => {
                // @ts-ignore
                if (ref?.$el) {
                  // @ts-ignore
                  tourStore.addStep(8, ref.$el)
                }
              }
            "
          >
            <template #icon>
              <ColumnHeightOutlined />
            </template>
          </Button>

          <template #overlay>
            <Menu v-model:activeKey="selectedSize" @click="onChangeSize">
              <MenuItem v-for="item in sizeItems" :key="item.key">
                <span> {{ item.label }} </span>
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
      </Tooltip>

      <Tooltip placement="top">
        <template #title>
          <span>Layout Mode</span>
        </template>
        <TableSegmentButton />
      </Tooltip>
    </Space>
  </div>
</template>

<script setup lang="ts" name="TableToolbar">
import { Dropdown, Input, Menu, MenuItem, Space, Tooltip } from 'ant-design-vue'
import type { MenuClickEventHandler } from 'ant-design-vue/es/menu/src/interface'
import { computed, onMounted, ref, unref, watch } from 'vue'
import { useTourStore } from '@/stores/modules/tour'
import { Button } from '@/components/button'
import { ColumnHeightOutlined, DownloadOutlined } from '@/components/icons'
import { useTableContext } from '../../hooks/useTableContext'
import { type SizeType, cardSizeItems, tableSizeItems } from '../../types'
import TableSegmentButton from './TableSegmentButton.vue'

const tourStore = useTourStore()
const table = useTableContext()
const isReload = ref(false)
const selectedSize = ref<SizeType>('middle')
const searchWord = ref('')
const phText = computed(() => unref(table.getBindValues).phText)
const sizeItems = computed(() =>
  unref(table.getContextValues).layoutMode === 'table' ? tableSizeItems : cardSizeItems
)

onMounted(() => {
  isReload.value = true

  setTimeout(() => {
    isReload.value = false
  }, 1000)
})

// layoutMode 변경시 selectedSize 초기화
watch(
  () => unref(table.getContextValues).layoutMode,
  () => {
    selectedSize.value = 'middle'
  }
)

function onChange(e: Event) {
  if (e.type === 'click') {
    onSearch()
  }
}

function onSearch() {
  table.fetchDataSource({ param: { searchWord: unref(searchWord) } })
}

const onChangeSize: MenuClickEventHandler = ({ key }) => {
  table.setProps({
    size: key as SizeType
  })
}

function onReload() {
  isReload.value = true
  searchWord.value = ''
  table.reload()

  setTimeout(() => {
    isReload.value = false
  }, 1000)
}
</script>

<style lang="scss" scoped>
.table-toolbar-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;

  @keyframes rotating {
    from {
      -webkit-transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(360deg);
    }
  }

  .rotating {
    animation: rotating 0.5s linear infinite;
  }
}
</style>
