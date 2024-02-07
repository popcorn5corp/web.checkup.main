<template>
  <div ref="wrapRef" class="dynamic-table-containter">
    <div class="dynamic-table-wrapper">
      <div class="header">
        <TableTags :items="getFilterFormItems" />
        <!-- <Button label="Drawer" @click="showDetail = true" /> -->
        <div class="table-btns">
          <Space>
            <template v-if="getContextValues.selectedRows?.length > 0">
              <Button v-if="showDownload" :label="buttonText.download" size="middle">
                <template #icon>
                  <DownloadOutlined />
                </template>
              </Button>

              <Button
                v-if="showDelete"
                :label="buttonText.delete"
                size="middle"
                @click="$emit('row-delete', tableRef?.selectedRows, tableRef?.selectedRowKeys)"
              >
                <template #icon>
                  <DeleteTwoTone />
                </template>
              </Button>
            </template>

            <slot name="tableBtns"></slot>

            <Button
              :ref="(ref) => tour.setTour(3, ref as Element)"
              v-if="showRegist"
              :label="buttonText.registration"
              size="middle"
              @click="$emit('row-add')"
            >
              <template #icon>
                <PlusCircleTwoTone />
              </template>
            </Button>

            <!-- 필터 버튼 -->
            <Button
              :ref="(ref) => tour.setTour(4, ref as Element)"
              v-if="activeFilter"
              type="primary"
              :label="buttonText.filter"
              size="middle"
              @click="showFilter = !showFilter"
            >
              <template #icon>
                <FilterTwoTone />
              </template>
            </Button>
          </Space>
        </div>
      </div>

      <Divider></Divider>

      <div class="body">
        <div
          class="content"
          :style="{ width: (props.showToolbar && showFilter) || openDetail ? '70%' : '100%' }"
        >
          <Table
            ref="tableRef"
            v-bind="{ ...props }"
            @row-add="$emit('row-add', $event)"
            @row-click="$emit('row-click', $event)"
            @row-select="$emit('row-select', $event)"
          >
            <slot />
          </Table>
        </div>

        <KeepAlive>
          <FilterForm
            v-if="showFilter && !openDetail"
            :items="getFilterFormItems"
            @close="(flag: boolean) => (showFilter = flag)"
            :style="{ width: props.showToolbar && showFilter && !openDetail ? '30%' : '' }"
          ></FilterForm>
        </KeepAlive>

        <div
          class="detail-wrapper"
          v-if="openDetail"
          :style="{ width: openDetail ? '30%' : '' }"
          :class="[getTheme.isRealDarkTheme && 'dark']"
        >
          <div class="title">
            <slot name="detail-title"></slot>

            <Button :size="'small'" @click="closeDetail" style="float: right">
              <template #icon>
                <font-awesome-icon class="xmark" :icon="['fas', 'xmark']" />
              </template>
            </Button>
          </div>

          <Divider />

          <div class="detail-content">
            <slot name="detail-content"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="DynamicTable">
import { Divider, Space } from 'ant-design-vue'
import { computed, ref, unref, useAttrs, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { Button } from '@/components/button'
import { FilterForm } from '@/components/filter-form'
import {
  DeleteTwoTone,
  DownloadOutlined,
  FilterTwoTone,
  PlusCircleTwoTone
} from '@/components/icons'
import { Table } from '@/components/table'
import { useTour } from '@/components/tour/hooks/useTour'
import { createDynamicTableContext } from '../hooks/useDynamicTableContext'
import { useFilter } from '../hooks/useFilter'
import type {
  DynamicTableAction,
  DynamicTableContextValues,
  DynamicTableExposes,
  DynamicTableProps
} from '../types'
import { defaultContenxtValues } from '../types'
import TableTags from './components/TableTags.vue'

const emit = defineEmits([
  'row-click',
  'change',
  'search',
  'row-add',
  'row-select',
  'row-delete',
  'update:openDetail'
])
const props = withDefaults(defineProps<DynamicTableProps>(), {
  filters: () => [],
  showToolbar: true,
  showRegist: true,
  showDownload: true,
  showDelete: true
})
defineExpose<DynamicTableExposes>({
  reload: (options: { isReset?: boolean }) => {
    tableRef.value?.getDataSource(options)
  }
})

const { getTheme } = useProjectConfigStore()
const tour = useTour()
const attrs = useAttrs()
const { t } = useI18n()
const wrapRef = ref(null)
const innerProps = ref<Partial<DynamicTableProps>>()
const tableRef = ref<InstanceType<typeof Table>>()
const showFilter = ref(false)
const activeFilter = ref(
  (props.filters && props.filters.length) || props.filterRequest ? true : false
)

const buttonText = computed(() => ({
  delete: props.deleteBtnText || t('component.button.delete'),
  download: t('component.button.download'),
  registration: t('component.button.registration'),
  filter: t('component.button.filter')
}))

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
  () => unref(tableRef)?.selectedRows,
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

function closeDetail() {
  emit('update:openDetail', false)
  unref(tableRef)?.initCustomRow()
}

let dynamicTableAction: DynamicTableAction = {
  setProps,
  setContextValues,
  getFilterFormItems: () => unref(getFilterFormItems),
  setFilterFormItem,
  clearSelectedItems,
  initFilterFormItems,
  closeDetail: () => {
    emit('update:openDetail', false)
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

setContextValues({
  activeFilter: unref(activeFilter)
})

/**
 * @description DynamicTable Context 생성
 */
createDynamicTableContext({ wrapRef, ...dynamicTableAction, getContextValues, getBindValues })
</script>
<style lang="scss" scoped>
.dynamic-table-containter {
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
      .basic-table-container {
        margin-right: 20px;
      }
    }

    .detail-wrapper {
      height: calc(100vh - 145px);
      background-color: $color-white;
      z-index: 2;
      right: 0;
      margin-top: -80px;
      border: 0.5px solid $color-gray-4;
      box-shadow: $shadow-3;
      height: calc(100vh - 145px);
      overflow-x: hidden;
      overflow-y: scroll;

      > .title {
        display: flex;
        font-size: 16px;
        font-weight: bold;
        justify-content: space-between;
        padding: 19.5px;
        align-items: end;
      }

      :deep(.ant-divider) {
        margin: 0;
      }

      &.dark {
        background: $color-dark;
        color: $color-white;
        border: 1.5px solid $color-gray-10;
      }
    }
  }
}
</style>
