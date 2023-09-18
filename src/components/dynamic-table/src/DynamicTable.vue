<script setup lang="ts" name="DynamicTable">
import { Input, Space } from 'ant-design-vue'
import { onMounted, ref, unref, useSlots } from 'vue'
import { Button } from '@/components/button'
import { DownloadOutlined } from '@/components/icons'
import { Table } from '@/components/table'
import { useTag } from '../hooks/useTag'
import type { DynamicTableEmits, DynamicTableProps } from '../interface'
import TableFilter from './components/TableFilter.vue'
import TableSegmentButton from './components/TableSegmentButton.vue'
import TableTags from './components/TableTags.vue'

defineEmits(['rowClick', 'change', 'search', 'rowAdd', 'rowSelect'])
const slots = useSlots()
const props = withDefaults(defineProps<DynamicTableProps>(), {
  showToolbar: false
})

const tableInstance = ref<InstanceType<typeof Table>>()
const showFilter = ref(true)
const isReload = ref(false)
const searchWord = ref('')

/**
 * @description Table Tag 관련 기능에 대한 Hooks
 */
const { tags, initTag } = useTag()

onMounted(() => {
  // temp code
  isReload.value = true

  setTimeout(() => {
    isReload.value = false
  }, 1000)
})

const onReload = (): void => {
  isReload.value = true
  unref(searchWord) && (searchWord.value = '')
  tableInstance.value?.getDataSource({ isReset: true })
  initTag()

  setTimeout(() => {
    isReload.value = false
  }, 1000)
}

const onSearch = (): void => {
  tableInstance.value?.getDataSource({ param: { searchWord: unref(searchWord) } })
}

const refetch = (options: { isReset?: boolean }) => {
  tableInstance.value?.getDataSource(options)
}

defineExpose({
  getDataSource: tableInstance.value?.getDataSource,
  getColumns: tableInstance.value?.getColumns,
  refetch
})
</script>

<template>
  <div class="dynamic-table-containter">
    <div class="table-header">
      <Space>
        <span class="total-count" v-if="tableInstance?.total !== null">{{
          $t('common.tableTotalText', { count: tableInstance?.total })
        }}</span>

        <div class="table-search">
          <Input
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
        </div>
        <div class="table-btns">
          <Space>
            <slot name="tableBtns"></slot>

            <Button :label="$t('common.registration')" size="large" @click="$emit('rowAdd')" />
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
            <TableSegmentButton />
            <Button
              type="primary"
              :label="$t('common.filterText')"
              size="large"
              @click="showFilter = !showFilter"
            />
          </Space>
        </div>
      </Space>
    </div>

    <div class="table-body">
      <div class="table-content-wrapper">
        <div class="table-content" :style="{ flex: showFilter ? 0.7 : 1 }">
          <TableTags />

          <Table
            ref="tableInstance"
            v-bind="{ ...props }"
            @row-add="$emit('rowAdd', $event)"
            @row-click="$emit('rowClick', $event)"
            @row-select="$emit('rowSelect', $event)"
          >
            <slot />
          </Table>
        </div>

        <TableFilter v-if="showFilter" @showFilter="(flag: boolean) => (showFilter = flag)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dynamic-table-containter {
  .table-header {
    margin: 1rem 0 1.5rem 0;

    .total-count {
      font-size: 14px;
      font-weight: 400;
      display: inline-block;
      width: 80px;
    }

    :deep(.ant-space) {
      display: flex;
      width: 100%;
      justify-content: space-between;

      .table-search {
        display: flex;
        flex: 1;
        gap: 10px;
        height: 40px;
        width: 500px;

        :deep(.ant-input-affix-wrapper) {
          height: 100%;
        }

        :deep(.ant-select-selector) {
          flex: 0.5;
          height: 44px;
          align-items: center;
          border-radius: 9px;
        }
      }
    }
  }

  .table-body {
    display: flex;
    flex-direction: column;

    > span {
      margin-bottom: 16px;
    }

    .table-content-wrapper {
      display: flex;

      .table-content {
        flex: 1;

        .table-toolbar {
          display: flex;
          justify-content: end;
        }
      }

      .filter-wrapper {
        flex: 0.3;
        overflow-y: auto;
        height: calc(100vh - 240px);
      }
    }
  }

  @-webkit-keyframes rotating {
    from {
      -webkit-transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(360deg);
    }
  }

  .rotating {
    -webkit-animation: rotating 0.5s linear infinite;
  }
}
</style>
