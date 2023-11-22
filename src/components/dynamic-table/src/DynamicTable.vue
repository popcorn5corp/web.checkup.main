<template>
  <div ref="wrapRef" class="dynamic-table-containter">
    <!-- <div class="dynamic-table-wrapper"> -->
    <div class="header">
      <TableTags :items="getFilterFormItems" />
      <!-- <Button label="Drawer" @click="showDetail = true" /> -->
      <div class="table-btns">
        <Space>
          <slot name="tableBtns"></slot>

          <template v-if="getContextValues.selectedRows.length > 0">
            <Button :label="$t('common.download')" size="middle">
              <template #icon>
                <DownloadOutlined />
              </template>
            </Button>

            <Button
              :label="$t('common.delete')"
              size="middle"
              @click="$emit('row-delete', tableRef?.selectedRows, tableRef?.selectedRowKeys)"
            >
              <template #icon>
                <DeleteTwoTone />
              </template>
            </Button>
          </template>

          <Button :label="$t('common.registration')" size="middle" @click="$emit('row-add')">
            <template #icon>
              <PlusCircleTwoTone />
            </template>
          </Button>

          <!-- 필터 버튼 -->
          <Button
            v-if="filters"
            type="primary"
            :label="$t('common.filterText')"
            size="middle"
            @click="showFilter = !showFilter"
          >
            <template #icon>
              <FilterOutlined />
            </template>
          </Button>
        </Space>
      </div>
    </div>

    <Divider></Divider>

    <div class="body">
      <div class="content" :style="{ width: props.showToolbar && showFilter ? '75%' : '100%' }">
        <Table
          ref="tableRef"
          v-bind="{ ...props }"
          @row-add="$emit('row-add', $event)"
          @row-click="onRowClick"
          @row-select="$emit('row-select', $event)"
        >
          <slot />
        </Table>
      </div>

      <FilterForm
        v-if="showFilter"
        :items="getFilterFormItems"
        @close="(flag: boolean) => (showFilter = flag)"
        :style="{ width: props.showToolbar && showFilter ? '25%' : '' }"
      ></FilterForm>
    </div>
    <!-- </div> -->

    <!-- <div class="detail-wrapper" v-if="showDetail" :style="{ width: showDetail ? '25%' : '' }">
      <div class="title">
        <span> 상세 영역 </span>
        <Button :size="'small'">
          <template #icon>
            <font-awesome-icon @click="showDetail = false" class="xmark" :icon="['fas', 'xmark']" />
          </template>
        </Button>
      </div>

      <Divider />

      <div id="detail-content">
      </div>
    </div> -->
  </div>
</template>
<script setup lang="ts" name="DynamicTable">
import { Divider, Space } from 'ant-design-vue'
import { computed, ref, unref, useAttrs, watch } from 'vue'
import { Button } from '@/components/button'
import { FilterForm } from '@/components/filter-form'
import {
  DeleteOutlined,
  DeleteTwoTone,
  DownloadOutlined,
  FilterOutlined,
  PlusCircleOutlined,
  PlusCircleTwoTone,
  PlusOutlined,
  UserAddOutlined
} from '@/components/icons'
import { Table } from '@/components/table'
import { createDynamicTableContext } from '../hooks/useDynamicTableContext'
import { useFilter } from '../hooks/useFilter'
import type {
  DynamicTablExposes,
  DynamicTableAction,
  DynamicTableContextValues,
  DynamicTableProps
} from '../types'
import { defaultContenxtValues } from '../types'
import TableTags from './components/TableTags.vue'

const emit = defineEmits(['row-click', 'change', 'search', 'row-add', 'row-select', 'row-delete'])
const props = withDefaults(defineProps<DynamicTableProps>(), {
  showToolbar: true,
  filters: () => []
})
defineExpose<DynamicTablExposes>({
  reload: (options: { isReset?: boolean }) => {
    tableRef.value?.getDataSource(options)
  },
  getShowToolbar: () => {
    return computed(() => props.showToolbar && unref(showFilter))
  }
})

const onRowClick = (event: any) => {
  console.log('onRowClick :: ', event)
  emit('row-click', event)
}

const attrs = useAttrs()
const wrapRef = ref(null)
const innerProps = ref<Partial<DynamicTableProps>>()
const tableRef = ref<InstanceType<typeof Table>>()
const showFilter = ref(false)
// const showDetail = ref(true)

const contextValues = ref<DynamicTableContextValues>({
  ...defaultContenxtValues
})

const getProps = computed<DynamicTableProps>(() => {
  return {
    ...props,
    ...unref(innerProps)
  }
})

function setProps(props: Partial<DynamicTableProps>) {
  innerProps.value = {
    ...unref(innerProps),
    ...props
  }
}

/**
 * @description DynamicTable 컴포넌트 Context에서 공유되는 Values
 */
const getContextValues = computed(() => {
  return {
    ...unref(contextValues)
  }
})

function setContextValues(values: Partial<DynamicTableContextValues>) {
  contextValues.value = {
    ...unref(contextValues),
    ...values
  }
}

const { getFilterFormItems, clearSelectedItems, setFilterFormItem, initFilterFormItems } =
  useFilter(getProps)

watch(
  () => tableRef.value?.selectedRows,
  (selectedRows) => {
    setContextValues({ selectedRows })
  }
)

watch(
  unref(getFilterFormItems),
  (filterFormItems) => {
    setContextValues({ filterFormItems })
  },
  {
    immediate: true,
    deep: true
  }
)

let dynamicTableAction: DynamicTableAction = {
  setProps,
  setContextValues,
  getFilterFormItems: () => unref(getFilterFormItems),
  setFilterFormItem,
  clearSelectedItems,
  initFilterFormItems,
  getShowToolbar: () => {
    return computed(() => props.showToolbar && unref(showFilter))
  },
  closeFilter: () => {
    unref(showFilter) && (showFilter.value = false)
  },
  emitter: emit
}

const getBindValues = computed<Recordable>(() => {
  let propsData = {
    ...attrs,
    ...unref(getProps)
  }

  return propsData
})

/**
 * @description DynamicTable Context 생성
 */
createDynamicTableContext({ wrapRef, ...dynamicTableAction, getContextValues, getBindValues })
</script>
<style lang="scss" scoped>
.dynamic-table-containter {
  // display: flex;
  // // height: 100%;
  // position: relative;
  // .dynamic-table-wrapper {
  // flex: 1;
  // position: relative;
  .header {
    display: flex;
    justify-content: space-between;
    gap: 10px;

    .table-btns {
      height: 32px;
    }

    .total-count {
      font-size: 14px;
      font-weight: 400;
      display: inline-block;
      width: 80px;
    }

    :deep(.ant-space) {
      // display: flex;
      // width: 100%;
      // justify-content: space-between;

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
    flex-direction: row;

    .content {
      .table-container {
        margin-right: 20px;
      }
    }
  }
  // }

  // .detail-wrapper {
  //   flex: 2;
  //   background-color: $color-white;
  //   // height: 100%;
  //   position: absolute;
  //   width: 500px;
  //   z-index: 2;
  //   right: 0;
  //   height: 100%;
  //   margin-right: -15px;
  //   margin-top: -15px;

  //   border: 0.5px solid $color-gray-4;

  //   > .title {
  //     display: flex;
  //     font-size: 16px;
  //     font-weight: bold;
  //     justify-content: space-between;
  //     padding: 18.5px;
  //     align-items: end;
  //   }

  //   :deep(.ant-divider) {
  //     margin: 0;
  //   }
  // }
}
</style>
