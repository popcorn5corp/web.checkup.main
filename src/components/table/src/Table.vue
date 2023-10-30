<template>
  <div ref="wrapRef" class="table-container">
    <TableToolbar v-if="props.showToolbar" />

    <Table
      ref="tableRef"
      v-if="getContextValues.selectedLayoutMode === 'table'"
      v-bind="getBindValues"
      :scroll="{ y: 530 }"
      :row-key="rowKey"
      :custom-row="customRow"
      @change="changeTable"
    >
      <!-- @vue-skip -->
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
      <template #bodyCell="{ record, column, index, text }">
        <template v-if="column">
          <template v-if="column.key === 'index'">
            {{ getRecordNo(index) }}
          </template>
        </template>

        <slot name="bodyCell" :record="record" :column="column" :index="index" :text="text" />
      </template>

      <template #emptyText>
        <img :src="EmptyImage" style="width: 200px" />
        <div>{{ $t('common.message.noData') }}</div>
      </template>
    </Table>

    <CardView
      v-if="getContextValues.selectedLayoutMode === 'card'"
      :key="rowKey"
      @cardTableChange="changeTable"
    />
  </div>
</template>
<script setup lang="ts" name="Table">
import { Table } from 'ant-design-vue'
import omit from 'lodash-es/omit'
import { computed, ref, unref, useAttrs } from 'vue'
import type { CSSProperties } from 'vue'
import { useDynamicTableContext } from '@/components/dynamic-table/hooks/useDynamicTableContext'
import { useColumns } from '../hooks/useColumns'
import { useCustomRow } from '../hooks/useCustomRow'
import { useLoading } from '../hooks/useLoading'
import { useSelection } from '../hooks/useSelection'
import { useTable } from '../hooks/useTable'
import { createTableContext, useTableContext } from '../hooks/useTableContext'
import {
  type TableEmits,
  type TableProps,
  defaultOptions,
  defaultPaginaton,
  defaultToolbarOptions,
  tableLayoutModes
} from '../types'
import type { TableAction, TableContextValues } from '../types'
import TableToolbar from './components/TableToolbar.vue'
import EmptyImage from './images/no_data_2.png'

const emit = defineEmits<TableEmits>()
const props = withDefaults(defineProps<TableProps>(), {
  rowKey: 'key',
  loading: false,
  size: 'middle',
  options: () => defaultOptions,
  pagination: () => defaultPaginaton,
  toolbarOptions: () => defaultToolbarOptions,
  initParam: () => ({
    size: 0,
    page: 1
  })
})

const wrapRef = ref(null)
const dynamicTable = useDynamicTableContext()
const innerProps = ref<Partial<TableProps>>()
const contextValues = ref<TableContextValues>({
  selectedLayoutMode: tableLayoutModes.table
})
const dataSource = computed(() => props.dataSource || _dataSource.value)
const styles = ref<CSSProperties>({
  cursor: props.options.pointer ? 'pointer' : ''
})

const getProps = computed<TableProps>(() => {
  return {
    ...props,
    ...unref(innerProps)
  }
})

function setProps(props: Partial<TableProps>) {
  innerProps.value = {
    ...unref(innerProps),
    ...props
  }
}

/**
 * @description Table 컴포넌트 Context에서 공유되는 Values
 */
const getContextValues = computed<TableContextValues>(() => {
  return {
    ...unref(contextValues)
  }
})

function setContextValues(values: Partial<TableContextValues>) {
  contextValues.value = {
    ...unref(contextValues),
    ...values
  }
}

const { getLoading, setLoading } = useLoading(getProps)
const { customRow } = useCustomRow({ emit })

/**
 * @description Table 관련 기능에 대한 Hooks
 */
const {
  dataSource: _dataSource,
  getDataSource,
  pagination,
  total,
  changeTable,
  getRecordNo
} = useTable(getProps, {
  setLoading
})

/**
 * @description Table Columns 관련 기능에 대한 Hooks
 */
const { setColumns, getColumns } = useColumns(getProps)

/**
 * @description Table Selection 관련 기능에 대한 Hooks
 */
const { rowSelection, selectedRows } = useSelection(props.rowKey, dataSource)

/**
 * @description Table 컴포넌트 초기 세팅
 */
;(async () => {
  await getDataSource()

  if (props.columns) {
    await setColumns()
  }
})()

/**
 * @description Table 컴포넌트 Context가 제공하는 Actions
 */
const tableAction: TableAction = {
  setProps,
  setContextValues,
  getDataSource,
  getSize: () => {
    return unref(props.size)
  },
  // getCardSize: () => {

  // },
  reload: async (isReset = true) => {
    await getDataSource({ isReset })
  }
}

/**
 * @description Table 컴포넌트에 바인딩되는 Values
 */
const getBindValues = computed<Recordable>(() => {
  let propsData = {
    ...useAttrs(),
    customRow,
    ...unref(getProps),
    dataSource: props.dataSource || _dataSource.value,
    columns: unref(getColumns),
    loading: unref(getLoading),
    rowSelection: props.options.isSelection ? rowSelection : undefined,
    pagination: props.options.isPagination && pagination
  }

  propsData = omit(propsData, ['showHeader'])
  return propsData
})

createTableContext({ wrapRef, ...tableAction, getContextValues, getBindValues })
// dynamicTable && useDynamicTableContext({ ...tableAction, getBindValues })

defineExpose({
  getDataSource,
  getColumns,
  reload: tableAction.reload,
  selectedRows,
  total
})
</script>
<style lang="scss" scoped>
.table-container {
  .table-toolbar-container {
    text-align: right;
    margin-bottom: 10px;
  }

  :deep(.ant-table) {
    // height: calc(100vh - 350px);
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
}
</style>
