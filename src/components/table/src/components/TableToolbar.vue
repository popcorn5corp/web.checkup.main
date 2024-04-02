<template>
  <div class="table-toolbar-container">
    <div class="table-search-wrapper">
      <Button
        :ref="(ref) => tour.setTour(4, ref as Element)"
        type="primary"
        size="middle"
        @click="() => (showFilter = !showFilter)"
      >
        <template #icon>
          <FilterTwoTone />
          <DownOutlined :rotate="showFilter ? 0 : 180" />
        </template>
      </Button>

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
            :ref="(ref) => tour.setTour(6, ref as Element)"
          >
            <template #icon>
              <font-awesome-icon icon="rotate" :class="[isReload && 'rotating']" />
            </template>
          </Button>
        </Tooltip>
        <!-- 
      <Tooltip placement="top">
        <template #title>
          <span>Full Download</span>
        </template>
        <Button :label="''" size="middle" :ref="(ref) => tour.setTour(7, ref as Element)">
          <template #icon>
            <DownloadOutlined />
          </template>
        </Button>
      </Tooltip> -->

        <Tooltip placement="top">
          <template #title>
            <span>Size</span>
          </template>
          <Dropdown :trigger="['click']">
            <Button size="middle" :ref="(ref) => tour.setTour(8, ref as Element)">
              <template #icon>
                <FontSizeOutlined />
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

        <!-- <Tooltip placement="top">
        <template #title>
          <span>Layout Mode</span>
        </template>
        <TableSegmentButton />
      </Tooltip> -->
      </Space>
    </div>
    <div v-if="showFilter" class="table-filter-wrapper">
      <KeepAlive>
        <FilterForm :items="getFilterFormItems" @close="(flag: boolean) => (showFilter = flag)" />
      </KeepAlive>
    </div>
  </div>
</template>

<script setup lang="ts" name="TableToolbar">
import { Dropdown, Input, Menu, MenuItem, Space, Tooltip } from 'ant-design-vue'
import type { MenuClickEventHandler } from 'ant-design-vue/es/menu/src/interface'
import { computed, onMounted, ref, unref, watch } from 'vue'
import { Button } from '@/components/button'
import { useDynamicTableContext } from '@/components/dynamic-table/hooks/useDynamicTableContext'
import { FilterForm } from '@/components/filter-form'
import { DownOutlined, FilterTwoTone, FontSizeOutlined } from '@/components/icons'
import { useTour } from '@/components/tour/hooks/useTour'
import { useTableContext } from '../../hooks/useTableContext'
import { type SizeType, cardSizeItems, tableSizeItems } from '../../types'
import TableSegmentButton from './TableSegmentButton.vue'

const showFilter = ref(true)
const tour = useTour()
const table = useTableContext()
const dynamicTable = useDynamicTableContext()
const isReload = ref(false)
const selectedSize = ref<SizeType>('middle')
const searchWord = ref('')
const phText = computed(() => unref(table.getBindValues).phText)
const getFilterFormItems = computed(() => dynamicTable.getFilterFormItems())
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
  .table-filter-wrapper {
    padding: 3px 0;
    animation: slide-bottom 0.4s;
  }
  .table-search-wrapper {
    .ant-btn:has(.anticon-down) {
      padding: 4.5px 5px;
    }
    .ant-btn {
      display: flex;
      align-items: center;

      .anticon-filter {
        font-size: 16px;
      }
      .anticon-down {
        font-size: 8px;
      }
    }
    display: flex;
    gap: 3px;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;

  @keyframes slide-bottom {
    0% {
      -webkit-transform: translateY(-10px);
      transform: translateY(-10px);
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }

  // .rotating {
  //   animation: rotating 0.5s linear infinite;
  // }
}
</style>
