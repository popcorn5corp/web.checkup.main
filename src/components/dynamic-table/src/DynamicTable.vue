<template>
  <div class="dynamic-table-containter">
    <div class="header">
      <TableTags />

      <div class="table-btns">
        <Space>
          <slot name="tableBtns"></slot>

          <Button :label="$t('common.registration')" size="large" @click="$emit('row-add')" />

          <!-- 필터 버튼 -->
          <Button
            v-if="showFilter"
            type="primary"
            :label="$t('common.filterText')"
            size="large"
            @click="_showFilter = !_showFilter"
          />
        </Space>
      </div>
    </div>

    <Divider></Divider>

    <div class="body">
      <div class="content-wrapper">
        <div class="content" :style="{ flex: props.showToolbar && _showFilter ? 0.7 : 1 }">
          <Table
            ref="tableInstance"
            v-bind="{ ...props }"
            @row-add="$emit('row-add', $event)"
            @row-click="$emit('row-click', $event)"
            @row-select="$emit('row-select', $event)"
          >
            <slot />
          </Table>
        </div>

        <TableFilter
          v-if="props.showToolbar && _showFilter"
          @showFilter="(flag: boolean) => (_showFilter = flag)"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="DynamicTable">
import { Divider, Space } from 'ant-design-vue'
import { ref, useSlots } from 'vue'
import { Button } from '@/components/button'
import { Table } from '@/components/table'
import type { DynamicTableEmits, DynamicTableProps } from '../types'
import TableFilter from './components/TableFilter.vue'
import TableTags from './components/TableTags.vue'

defineEmits(['row-click', 'change', 'search', 'row-add', 'row-select'])
const slots = useSlots()
const props = withDefaults(defineProps<DynamicTableProps>(), {
  showToolbar: false,
  showFilter: false
})

const tableInstance = ref<InstanceType<typeof Table>>()
const _showFilter = ref(false)

const reload = (options: { isReset?: boolean }) => {
  tableInstance.value?.getDataSource(options)
}

defineExpose({
  getDataSource: tableInstance.value?.getDataSource,
  getColumns: tableInstance.value?.getColumns,
  reload
})
</script>
<style lang="scss" scoped>
.dynamic-table-containter {
  .header {
    display: flex;
    justify-content: space-between;
    gap: 10px;

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

      .search {
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

  .body {
    display: flex;
    flex-direction: column;

    > span {
      margin-bottom: 16px;
    }

    .content-wrapper {
      display: flex;

      .content {
        flex: 1;

        .table-toolbar {
          display: flex;
          justify-content: end;
        }
      }

      .filter-container {
        flex: 0.3;
        overflow-y: auto;
        height: calc(100vh - 240px);
      }
    }
  }

  // @-webkit-keyframes rotating {
  //   from {
  //     -webkit-transform: rotate(0deg);
  //   }

  //   to {
  //     -webkit-transform: rotate(360deg);
  //   }
  // }

  // .rotating {
  //   -webkit-animation: rotating 0.5s linear infinite;
  // }
}
</style>
