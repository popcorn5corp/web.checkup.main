<template>
  <Table
    ref="tableInstance"
    :scrollY="530"
    :row-key="rowKey"
    :data-source="dataSource"
    :columns="columns"
    :row-selection="props.options.isSelection ? _rowSelection : undefined"
    :loading="loading"
    :size="size"
    :custom-row="
      (record) => ({
        onClick: () => {
          $emit('rowClick', record)
        }
      })
    "
    :pagination="props.options.isPagination && pagination"
    @change="changeTable"
  >
    <template #bodyCell="{ record, column, index, text }">
      <template v-if="column">
        <template v-if="column.key === 'index'">
          {{ getRecordNo(index) }}
        </template>
      </template>

      <slot name="bodyCell" :record="record" :column="column" :index="index" :text="text" />
    </template>

    <template #emptyText>
      <img src="./images/no_data_2.png" style="width: 200px" />
      <div>{{ $t('common.message.noData') }}</div>
    </template>
  </Table>
</template>
<script setup lang="ts" name="Table">
import { Table } from 'ant-design-vue'
import { computed, ref, toRefs, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { useColumns } from '../hooks/useColumns'
import { useSelection } from '../hooks/useSelection'
import { useTable } from '../hooks/useTable'
import { type TableEmits, type TableProps, defaultOptions, defaultPaginaton } from '../types'

defineEmits<TableEmits>()
const props = withDefaults(defineProps<TableProps>(), {
  rowKey: 'key',
  loading: false,
  size: 'middle',
  options: () => defaultOptions,
  pagination: () => defaultPaginaton
})
const loading = computed(() => props.loading || _loading.value)
const dataSource = computed(() => props.dataSource || _dataSource.value)
const columns = computed(() => _columns.value)
const styles = ref<CSSProperties>({
  cursor: props.options.pointer ? 'pointer' : ''
})

/**
 * @description Table 관련 기능에 대한 Hooks
 */
const {
  dataSource: _dataSource,
  getDataSource,
  pagination,
  total,
  changeTable,
  getRecordNo,
  loading: _loading
} = useTable(
  props.dataRequest,
  props.dataCallback,
  props.dataSource,
  props.initParam,
  props.options.isPagination,
  props.pagination
)

/**
 * @description Table Columns 관련 기능에 대한 Hooks
 */
const { getColumns, columns: _columns } = useColumns(
  props.columns,
  props.columnRequest,
  props.options.isShowNo
)

/**
 * @description Table Selection 관련 기능에 대한 Hooks
 */
const { rowSelection: _rowSelection, selectedRows } = useSelection(props.rowKey, dataSource)

/**
 * @description Table 컴포넌트 초기 세팅
 */
;(async () => {
  if (props.initParam || props.dataSource) {
    await getDataSource()
  }

  if (props.columns) {
    await getColumns()
  }
})()

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
  height: calc(100vh - 350px);
  overflow: auto;

  .ant-table-thead {
    th {
      background: transparent !important;
      border-bottom: 1px solid rgb(229, 232, 235) !important;
      font-size: 14px !important;
    }
  }

  .ant-table-row {
    cursor: v-bind('styles.cursor');
  }
}
</style>
