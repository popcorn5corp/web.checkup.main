<script setup lang="ts" name="LayoutFilter">
import { ref, watch } from 'vue'
import { Table, Space } from 'ant-design-vue'

import Filter from './components/Filter.vue'
import { Button } from '@/components/Button'
import type { DynamicTableProps, DynamicTableEmits, TablePagination } from './types'
import TableTags from './components/TableTags.vue'
import TableSegmentButton from './components/TableSegmentButton.vue'
import { useTable } from './hooks/useTable';

const emits = defineEmits(['rowClick', 'change', 'search'])
const props = withDefaults(defineProps<DynamicTableProps>(), {
  columns: () => [],
  mode: 'dynamic',
  rowKey: 'id',
  options: () => ({
    pointer: true,
    isPagination: true,
    isShowNo: true
  })
})

const tableContentWrapperRef = ref();
const showFilter = ref(true)
const cursor = ref(props.options.pointer && 'pointer');
const tableColumns = ref([...props.columns])
let isTableChangedFlag = false // 테이블 변경, 검색 조건 변경 구분을 위한 flag
const { dataSource, getDataSource, pagination, total, changeTable, getRecordNo, isLoading, refetch } = useTable(props.request, props.initParam, props.options.isPagination, props.dataCallback);

watch(() => props.initParam, getDataSource, {
  immediate: true,
  deep: true
})



if (props.options.isShowNo) {
  setNoColumns()
}

// watch(
//   () => dataSource?.value,
//   () => {
//     // pagination 사용하는 경우
//     if (options.value.isPagination) {
//       // 검색조건 변경일 경우, current 초기화
//       if (isTableChangedFlag) {
//         isTableChangedFlag = false
//       } else {
//         tablePagination.value.current = 1
//       }
//     }
//   }
// )

/**
 * 테이블 칼럼 세팅 ('NO' 칼럼 추가)
 */
function setNoColumns() {
  tableColumns.value.unshift({
    title: 'No',
    align: 'center',
    dataIndex: 'index',
    key: 'index'
  })
}

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

defineExpose({
  // getDataSource,
  refetch
})

</script>

<template>
  <div class="dynamic-table-containter">
    <div class="table-header">
      <Space>
        <span v-if="dataSource.length !== null">{{
          $t('common.tableTotalText', { count: dataSource.length })
        }}</span>

        <div class="table-search">
          <a-input :placeholder="$t('common.searchPlaceholder')">
            <template #suffix>
              <font-awesome-icon style="color: #d9d9d9" :icon="['fas', 'magnifying-glass']" />
            </template>
          </a-input>
        </div>


        <div class="table-btns">
          <Space>
            <TableSegmentButton />
            <slot name="tableBtns"></slot>

            <Button type="primary" :label="$t('common.filterText')" size="large" @click="showFilter = !showFilter" />
          </Space>
        </div>
      </Space>
    </div>

    <div class="table-body">
      <div class="table-content-wrapper">
        <div class="table-content" :style="{ flex: showFilter ? 0.7 : 1 }">
          <TableTags />

          <Table :columns="tableColumns" :dataSource="dataSource" :loading="isLoading" :total="total" :size="size"
            :customRow="customRow" :pagination="props.options.isPagination && pagination" @change="changeTable">
            <template #bodyCell="{ record, column, index, text }">
              <template v-if="column.key === 'index'">
                {{ getRecordNo(index) }}
              </template>
              <slot name="bodyCell" :record="record" :column="column" :index="index" :text="text" />
            </template>
          </Table>
        </div>

        <Filter v-if="showFilter" @showFilter="(flag: boolean) => (showFilter = flag)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dynamic-table-containter {
  .table-header {
    // display: flex;
    // align-items: center;
    // justify-content: space-between;
    margin: 1rem 0 1.5rem 0;

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

      :deep(.table-btns) {
        // .ant-btn {
        //   margin-left: 0.5rem;
        //   font-weight: 600;
        // }
      }
    }
  }

  .table-body {
    display: flex;
    flex-direction: column;

    >span {
      margin-bottom: 16px;
    }

    .table-content-wrapper {
      display: flex;

      .table-content {
        flex: 0.7;

        :deep(.ant-table) {
          // overflow-y: auto
          height: calc(100vh - 280px);
          overflow: auto;

          .ant-table-thead {
            color: rgb(4, 17, 29) !important;

            th {
              background: transparent !important;
              border-bottom: 1px solid rgb(229, 232, 235) !important;
              // font-weight: 400 !important;
              font-size: 14px !important;
            }
          }

          .ant-table-row {
            cursor: v-bind(cursor)
          }
        }
      }

      .filter-wrapper {
        flex: 0.3;
        overflow-y: auto;
        height: calc(100vh - 240px);
      }
    }
  }
}
</style>