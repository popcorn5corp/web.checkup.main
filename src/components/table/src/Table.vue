<template>
  <div ref="wrapRef" class="table-container">
    <TableToolbar v-if="props.showToolbar" />

    <!-- <h3>Total Count: 200</h3>

    <div class="menu-text-popup-1">
      <span class="select-count">{{ selectedRows.length }}개 게시물이 선택되었습니다.</span>
      <em class="select-clear">선택취소</em>
    </div> -->

    <Table
      ref="tableRef"
      v-if="getContextValues.layoutMode === 'table'"
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

    <CardView v-if="getContextValues.layoutMode === 'card'" :key="rowKey" />
  </div>
</template>
<script setup lang="ts" name="Table">
import { Table } from 'ant-design-vue'
import omit from 'lodash-es/omit'
import { computed, ref, unref, useAttrs, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { useColumns } from '../hooks/useColumns'
import { useCustomRow } from '../hooks/useCustomRow'
import { useLoading } from '../hooks/useLoading'
import { useSelection } from '../hooks/useSelection'
import { useTable } from '../hooks/useTable'
import { createTableContext } from '../hooks/useTableContext'
import {
  defaultContenxtValues,
  defaultOptions,
  defaultPaginaton,
  defaultToolbarOptions
} from '../types'
import type { TableAction, TableContextValues, TableEmits, TableProps } from '../types'
import CardView from './components/CardView.vue'
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
const innerProps = ref<Partial<TableProps>>()
const contextValues = ref<TableContextValues>({
  ...defaultContenxtValues
})
const dataSource = computed(() => props.dataSource || _dataSource.value)
const styles = ref<CSSProperties>({
  cursor: props.options.pointer ? 'pointer' : ''
})

/**
 * @description Table 컴포넌트 layoutMode 변경시 데이터 초기화
 */
watch(
  () => unref(contextValues).layoutMode,
  async () => {
    const { tableSize, cardSize } = defaultContenxtValues
    setContextValues({ tableSize, cardSize })
    setProps({ size: 'middle' })
    initTableState()
    await fetchDataSource()
  }
)

/**
 * @description ATable 컴포넌트에 바인딩하기 위한 상위 props & 내부적으로 변경된 innerProps
 */
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
  fetchDataSource,
  total,
  changeTable,
  getRecordNo,
  initTableState,
  getDataSource,
  setPagination,
  getPagination
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
  await fetchDataSource()

  if (props.columns) {
    await setColumns()
  }
})()

/**
 * @description Table 컴포넌트 Context가 제공하는 Action 함수
 */
const tableAction: TableAction = {
  setProps,
  setContextValues,
  fetchDataSource,
  getDataSource: () => unref(getDataSource),
  getLoading: () => unref(getLoading) as boolean,
  getSize: () => unref(getProps).size,
  reload: async (isReset = true) => {
    await fetchDataSource({ isReset })
  },
  initTableState,
  changeTable,
  getRecordNo,
  setPagination,
  getPagination: () => unref(getPagination),
  emitter: emit
}

/**
 * @description Table 컴포넌트에 바인딩되는 Values
 */
const getBindValues = computed<Recordable>(() => {
  let propsData = {
    ...useAttrs(),
    customRow,
    ...unref(getProps),
    dataSource: unref(getDataSource),
    columns: unref(getColumns),
    loading: unref(getLoading),
    pagination: unref(getPagination),
    rowSelection: props.options.isSelection ? rowSelection : undefined
  }

  propsData = omit(propsData, ['showHeader'])
  return propsData
})

/**
 * @description Table 컴포넌트에 대한 Provide Context 생성
 */
createTableContext({ wrapRef, ...tableAction, getContextValues, getBindValues })

defineExpose({
  getDataSource: fetchDataSource,
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

.menu-text-popup-1 {
  width: -moz-fit-content;
  width: fit-content;
  height: 35px;
  line-height: 33px;
  padding: 0 18px;
  -webkit-border-radius: 200px;
  border-radius: 200px;
  border: 1px solid #6449fc;
  background: #fff;
  position: absolute;
  left: 50%;
  // top: 60px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  margin: 0 auto;
  text-align: center;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
