<script setup lang="ts" name="TableComponent">
import { ref, toRefs, watch } from 'vue'
import type { DefaultPagination, TableProps } from './types'
import { SearchOutlined } from '@ant-design/icons-vue'

const emits = defineEmits(['rowClick', 'change', 'search'])
const props = withDefaults(defineProps<TableProps>(), {
  options: () => ({
    pointer: false,
    isPagination: true,
    isShowNo: true
  })
})

function getDefaultPagination(): DefaultPagination {
  return {
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    position: ['bottomRight'],
    pageSizeOptions: ['10', '30', '50']
  }
}

const { total, options, columns, dataSource, pagination, size } = toRefs(props)
// const cursor = ref<boolean | string>(options.value.pointer && "pointer");
const tableColumns = ref(columns)
const isUsePagination =
  options.value.isPagination === undefined || options.value.isPagination === true
const tablePagination = ref({
  ...getDefaultPagination(),
  ...pagination?.value,
  total
})

// 테이블 변경, 검색 조건 변경 구분을 위한 flag
let isTableChangedFlag = false

/**
 * 테이블 칼럼 세팅 ('NO' 칼럼 추가)
 */
function setColumns() {
  tableColumns.value.unshift({
    title: 'No',
    align: 'center',
    dataIndex: 'index',
    key: 'index'
  })
}
watch(
  columns,
  () => {
    if (options.value.isShowNo === undefined || options.value.isShowNo === true) {
      setColumns()
    }
  },
  {
    immediate: true
  }
)

watch(
  () => dataSource.value,
  () => {
    // pagination 사용하는 경우
    if (isUsePagination) {
      // 검색조건 변경일 경우, current 초기화
      if (isTableChangedFlag) {
        isTableChangedFlag = false
      } else {
        tablePagination.value.current = 1
      }
    }
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

/**
 * 테이블 'NO' 칼럼에 대한 값을 계산
 * @param {number} rowIndex
 */
const getRowNo = (rowIndex: number) => {
  const { pageSize, current } = tablePagination.value
  if (pageSize && current) {
    return rowIndex + 1 + pageSize * (current - 1)
  }
}

/**
 * 테이블 Change 이벤트
 * @param {{total: number, current: number, pageSize: number, showSizeChanger: boolean, position: string[], pageSizeOptions: string[]}} event
 */
const onChange = (event: { pageSize: number; current: number }) => {
  const { pageSize, current } = event
  // 페이지 사이즈 변경 시, 첫 페이지로 이동
  const isChangePageSize = tablePagination.value.pageSize !== pageSize

  tablePagination.value.pageSize = pageSize
  tablePagination.value.current = isChangePageSize ? 1 : current

  emits('change', {
    ...event,
    page: isChangePageSize ? 1 : current,
    size: pageSize
  })

  isTableChangedFlag = true
}

/**
 * @param {string[]} selectedKeys
 * @param {() => void} confirm
 * @param {string} dataIndex
 */
const handleSearch = (selectedKeys: string[], dataIndex: string, confirm: () => void) => {
  emits('search', {
    key: dataIndex,
    value: selectedKeys[0]
  })
  confirm()
}

const handleReset = (selectedKeys: string[], dataIndex: string, clearFilters: Function) => {
  clearFilters({ confirm: true })
  emits('search', {
    key: dataIndex,
    value: selectedKeys[0]
  })
}
</script>
<template>
  <div class="wrapper">
    <div class="table-wrapper">
      <div>
        <div class="table-top">
          <!-- <span v-if="total !== null">전체: {{ total }}건</span> -->
          <div class="btn-group">
            <slot name="buttons">
              <!-- <a-button shape="round">
					<template #icon><DownloadOutlined /></template>일괄다운</a-button
				>
				<a-button
					class="btn-new"
					type="primary"
					shape="circle"
					title="체크리스트 생성"
					><i class="fas fa-plus"></i
				></a-button> -->
            </slot>
          </div>
        </div>

        <a-table
          :loading="loading"
          :dataSource="dataSource"
          :columns="tableColumns"
          :size="size"
          :pagination="isUsePagination ? tablePagination : false"
          :customRow="customRow"
          @change="onChange"
        >
          <!--------------------- 테이블 Header Filter 영역 --------------------->
          <template
            #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
          >
            <slot
              name="customFilterDropdown"
              :setSelectedKeys="setSelectedKeys"
              :selectedKeys="selectedKeys"
              :confirm="confirm"
              :clearFilters="clearFilters"
              :column="column"
            />
            <div style="padding: 8px">
              <a-input
                ref="searchInput"
                :placeholder="`${column.title}을 검색해주세요.`"
                :value="selectedKeys[0]"
                style="width: 188px; margin-bottom: 8px; display: block"
                @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                @pressEnter="handleSearch(selectedKeys, column.dataIndex, confirm)"
              />
              <a-button
                type="primary"
                size="small"
                style="width: 90px; margin-right: 8px"
                @click="handleSearch(selectedKeys, column.dataIndex, confirm)"
              >
                <template #icon>
                  <SearchOutlined />
                </template>
                검색
              </a-button>
              <a-button
                size="small"
                style="width: 90px"
                @click="handleReset(selectedKeys, column.dataIndex, clearFilters)"
              >
                초기화
              </a-button>
            </div>
          </template>

          <!------------------- 테이블 Header Filter Icon 영역 ------------------->
          <template #customFilterIcon="{ filtered }">
            <slot name="filterIcon" :filtered="filtered" />
            <!-- <SearchOutlined :style="{ color: filtered ? '#108ee9' : undefined }" /> -->
          </template>

          <!-------------------------- 테이블 Body 영역-------------------------->
          <template #bodyCell="{ record, column, index, text }">
            <template v-if="column.key === 'index'">
              {{ options.isPagination ? getRowNo(index) : index + 1 }}
            </template>
            <slot name="bodyCell" :record="record" :column="column" :index="index" :text="text" />
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
:deep(.ant-table) {
  overflow: auto;
  // .ant-table-row {
  //   cursor: v-bind(cursor);
  // }
}

.table-top {
  display: block;
  clear: both;
  height: 40px;

  > span {
    float: left;
  }

  > .btn-group {
    float: right;
    display: flex;
    gap: 5px;
  }
}

:deep(.ant-table-thead) {
  color: rgb(4, 17, 29) !important;

  th {
    background: rgb(255, 255, 255) !important;
    border-bottom: 1px solid rgb(229, 232, 235) !important;
    font-weight: 400 !important;
    font-size: 14px !important;
  }
}
</style>
