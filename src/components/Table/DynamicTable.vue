<script setup lang="ts" name="LayoutFilter">
import { Space, Table } from 'ant-design-vue'
import { onMounted, ref, unref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/Button'
import { DownloadOutlined } from '@/components/Icon'
import TableFilter from './components/TableFilter.vue'
import TableSegmentButton from './components/TableSegmentButton.vue'
import TableTags from './components/TableTags.vue'
import { useColumns } from './hooks/useColumns'
import { useSelection } from './hooks/useSelection'
import { useTable } from './hooks/useTable'
import { useTag } from './hooks/useTag'
import type { DynamicTableProps } from './interface'

const emits = defineEmits(['rowClick', 'change', 'search', 'rowAdd', 'rowSelect'])
const props = withDefaults(defineProps<DynamicTableProps>(), {
  columns: () => [],
  rowKey: 'key',
  mode: 'dynamic',
  options: () => ({
    pointer: true,
    isPagination: true,
    isShowNo: true
  })
})

const showFilter = ref(true)
const isReload = ref(false)
const cursor = ref(props.options.pointer && 'pointer')
const searchWord = ref('')
let isTableChangedFlag = false // 테이블 변경, 검색 조건 변경 구분을 위한 flag

/**
 * @description Table 관련 기능에 대한 Hooks
 */
const { dataSource, getDataSource, pagination, total, changeTable, getRecordNo, isLoading } =
  useTable(props.dataRequest, props.initParam, props.options.isPagination, props.dataCallback)

/**
 * @description Table Selection 관련 기능에 대한 Hooks
 */
const { rowSelection, selectedRows } = useSelection(props.rowKey, dataSource)

/**
 * @description Table Columns 관련 기능에 대한 Hooks
 */
const { getColumns, columns } = useColumns(
  props.columnRequest,
  props.initColumns,
  props.options.isShowNo
)

/**
 * @description Table Tag 관련 기능에 대한 Hooks
 */
const { tags, initTag } = useTag()

// watch(() => tags.value, () => {
//   isLoading.value = true;

//   setTimeout(() => {
//     isLoading.value = false;
//   }, 300)
// }, {
//   deep: false
// })

onMounted(() => {
  // temp code
  isReload.value = true

  setTimeout(() => {
    isReload.value = false
  }, 1000)
})

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

const onReload = () => {
  isReload.value = true
  unref(searchWord) && (searchWord.value = '')
  getDataSource({ isReset: true })
  initTag()

  setTimeout(() => {
    isReload.value = false
  }, 1000)
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

const onSearch = () => {
  getDataSource({ param: { searchWord: unref(searchWord) } })
}

const refetch = (param: any) => getDataSource(param)

defineExpose({
  getDataSource,
  getColumns,
  refetch
})
</script>

<template>
  <div class="dynamic-table-containter">
    <div class="table-header">
      <Space>
        <span class="total-count" v-if="dataSource.length !== null">{{
          $t('common.tableTotalText', { count: dataSource.length })
        }}</span>

        <div class="table-search">
          <a-input
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
          </a-input>
        </div>
        <div class="table-btns">
          <Space>
            <!-- <TableSegmentButton /> -->
            <slot name="tableBtns"></slot>

            <Button
              v-if="selectedRows.length"
              :label="$t('common.delete')"
              size="large"
              @click="$emit('rowSelect', unref(selectedRows))"
            />
            <div v-else :style="{ width: '56px' }"></div>
            <Button :label="$t('common.registration')" size="large" @click="$emit('rowAdd')" />

            <Button :label="''" size="large" @click="onReload">
              <template #icon>
                <font-awesome-icon icon="rotate" :class="[isReload && 'rotating']" />
                <!-- <font-awesome-icon icon="arrow-rotate-right" :class="[isReload && 'rotating']" /> -->
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

          <!-- <div class="table-toolbar">
            <Space>
              <a-button>
                <template #icon>
                  <ReloadOutlined />
                </template>
              </a-button>
              <a-button>
                <template #icon>
                  <DownloadOutlined />
                </template>
              </a-button>
            </Space>
          </div> -->

          <!-- <a-divider></a-divider> -->
          <!-- <Space>
            <Button :label="$t('common.delete')" size="large" @click="onDeleteRow" />
            <Button :label="$t('common.registration')" size="large" @click="$emit('rowAdd')" />
            <Button type="primary" :label="$t('common.filterText')" size="large" @click="showFilter = !showFilter" />
          </Space> -->
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
        </div>

        <TableFilter v-if="showFilter" @showFilter="(flag: boolean) => (showFilter = flag)" />
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

        :deep(.ant-table) {
          // overflow-y: auto
          height: calc(100vh - 320px);
          overflow: auto;

          .ant-table-thead {
            color: $color-dark !important;

            th {
              background: transparent !important;
              border-bottom: 1px solid rgb(229, 232, 235) !important;
              // font-weight: 400 !important;
              font-size: 14px !important;
            }
          }

          .ant-table-row {
            cursor: v-bind(cursor);
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
