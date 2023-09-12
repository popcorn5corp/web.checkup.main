<template>
  <Table
    :scrollY="530"
    :rowKey="rowKey"
    :columns="columns"
    :rowSelection="rowSelection"
    :dataSource="dataSource"
    :loading="isLoading"
    :total="total"
    :size="size"
    :customRow="customRow"
    :pagination="props.options.isPagination && pagination"
    @change="changeTable"
  >
    <template #bodyCell="{ record, column, index, text }">
      <template v-if="column.key === 'index'">
        {{ getRecordNo(index) }}
      </template>
      <slot name="bodyCell" :record="record" :column="column" :index="index" :text="text" />
    </template>
  </Table>
</template>
<script setup lang="ts" name="Table">
import { Table } from 'ant-design-vue'
import { ref, watch } from 'vue'
import { useColumns } from '../hooks/useColumns'
import { useSelection } from '../hooks/useSelection'
import { useTable } from '../hooks/useTable'
import type { TableEmits, TableProps } from '../interface'

const emits = defineEmits<TableEmits>()
const props = withDefaults(defineProps<TableProps>(), {
  rowKey: 'key',
  columns: () => [],
  dataSource: () => [],
  loading: false,
  total: 0,
  size: 'middle',
  options: () => ({
    pointer: true,
    isPagination: true,
    isShowNo: true
  })
})

const cursor = ref(props.options.pointer && 'pointer')

/**
 * @description Table 관련 기능에 대한 Hooks
 */
const { dataSource, getDataSource, pagination, total, changeTable, getRecordNo, isLoading } =
  useTable(props.dataRequest, props.initParam, props.options.isPagination, props.dataCallback)

/**
 * @description Table Columns 관련 기능에 대한 Hooks
 */
const { getColumns, columns } = useColumns(
  props.columnRequest,
  props.initColumns,
  props.options.isShowNo
)

/**
 * @description Table Selection 관련 기능에 대한 Hooks
 */
const { rowSelection, selectedRows } = useSelection(props.rowKey, dataSource)

watch(
  () => props.initColumns,
  async () => {
    getColumns()
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => props.initParam,
  () => {
    getDataSource()
  },
  {
    immediate: true,
    deep: true
  }
)

/**
 * 테이블 Row에 대한 이벤트를 제공하는 함수
 * @param {Object} record
 * @returns {{ onClick: () => void }}
 */
const customRow = (record: object) => ({
  onClick: () => {
    emits('rowClick', record)
  }
})

const refetch = (options: { isReset?: boolean }) => {
  getDataSource(options)
}

defineExpose({
  getDataSource,
  getColumns,
  refetch,
  selectedRows,
  total
})
</script>
<style lang="scss" scoped>
:deep(.ant-table) {
  // overflow-y: auto
  height: calc(100vh - 320px);
  overflow: auto;

  .ant-table-thead {
    th {
      background: transparent !important;
      border-bottom: 1px solid rgb(229, 232, 235) !important;
      font-size: 14px !important;
      // font-weight: 400 !important;
    }
  }

  .ant-table-row {
    cursor: v-bind(cursor);
  }
}
</style>
