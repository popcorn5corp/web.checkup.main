<template>
  <div class="table-toolbar-container">
    <Input
      class="search"
      v-model:value="searchWord"
      :placeholder="$t('common.searchPlaceholder')"
      @press-enter="onSearch"
      allow-clear
    >
      <template #suffix>
        <font-awesome-icon
          style="color: #d9d9d9"
          :icon="['fas', 'magnifying-glass']"
          @click="onSearch"
        />
      </template>
    </Input>

    <Space class="settings">
      <!-- <slot name="tableBtns"></slot> -->
      <Button :label="''" size="large" @click="onReload">
        <template #icon>
          <font-awesome-icon icon="rotate" :class="[isReload && 'rotating']" />
        </template>
      </Button>

      <Button :label="''" size="large">
        <template #icon>
          <DownloadOutlined />
        </template>
      </Button>

      <Dropdown :trigger="['click']">
        <Button size="large">
          <template #icon>
            <ColumnHeightOutlined />
          </template>
        </Button>

        <template #overlay>
          <Menu v-model:activeKey="selectedTableSize" @click="onChangeSize">
            <MenuItem key="middle">
              <span> Default </span>
            </MenuItem>
            <MenuItem key="small">
              <span> Compact </span>
            </MenuItem>
            <MenuItem key="large">
              <span> Large </span>
            </MenuItem>
          </Menu>
        </template>
      </Dropdown>

      <TableSegmentButton />
    </Space>
  </div>
</template>
<script setup lang="ts" name="TableToolbar">
import { Dropdown, Input, Menu, MenuItem, Space } from 'ant-design-vue'
import type { MenuClickEventHandler } from 'ant-design-vue/es/menu/src/interface'
import { onMounted, ref, unref } from 'vue'
import { Button } from '@/components/button'
import { ColumnHeightOutlined, DownloadOutlined } from '@/components/icons'
import { useTableContext } from '../../hooks/useTableContext'
import type { TableSize } from '../../types'
import TableSegmentButton from './TableSegmentButton.vue'

const table = useTableContext()
const isReload = ref(false)
const selectedTableSize = ref<TableSize>(table.getSize())
const searchWord = ref('')

/**
 * @description Table Tag 관련 기능에 대한 Hooks
 */
function onSearch() {
  table.getDataSource({ param: { searchWord: unref(searchWord) } })
}

onMounted(() => {
  // temp code
  isReload.value = true

  setTimeout(() => {
    isReload.value = false
  }, 1000)
})

const onChangeSize: MenuClickEventHandler = ({ key }) => {
  table.setProps({
    size: key as TableSize
  })
}

const onReload = (): void => {
  isReload.value = true
  table.reload()
  // unref(searchWord) && (searchWord.value = '')
  // getDataSource({ isReset: true })
  // initTag()

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

  .search {
    min-width: 200px;
    // display: flex;
    // flex: 1;
    // gap: 10px;
    // height: 40px;

    // :deep(.ant-input-affix-wrapper) {
    //   height: 100%;
    //   width: 200px;
    // }

    // :deep(.ant-select-selector) {
    //   flex: 0.5;
    //   height: 44px;
    //   align-items: center;
    //   border-radius: 9px;
    // }
  }

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
