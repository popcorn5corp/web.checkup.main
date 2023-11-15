<template>
  <div ref="wrapRef" class="dynamic-table-containter">
    <div class="header">
      <TableTags :items="filterFormItems" />

      <div class="table-btns">
        <Space>
          <slot name="tableBtns"></slot>

          <Button :label="$t('common.registration')" size="large" @click="$emit('row-add')" />
          <Button
            :label="$t('common.delete')"
            size="large"
            @click="
              () => {
                $emit('row-delete', tableRef?.selectedRows)
                // console.log('f', tableRef?.selectedRows)
              }
            "
          />

          <!-- 필터 버튼 -->
          <Button
            v-if="filters"
            type="primary"
            :label="$t('common.filterText')"
            size="large"
            @click="showFilter = !showFilter"
          />
        </Space>
      </div>
    </div>

    <Divider></Divider>

    <div class="body">
      <div class="content-wrapper">
        <div class="content" :style="{ width: props.showToolbar && showFilter ? '75%' : '100%' }">
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

        <FilterForm
          v-if="showFilter"
          :items="filterFormItems"
          @close="(flag: boolean) => (showFilter = flag)"
        ></FilterForm>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="DynamicTable">
import { Divider, Space } from 'ant-design-vue'
import { computed, ref, unref, useAttrs, watch } from 'vue'
import { Button } from '@/components/button'
import { FilterForm } from '@/components/filter-form'
import { Table } from '@/components/table'
import { createDynamicTableContext } from '../hooks/useDynamicTableContext'
import { useFilter } from '../hooks/useFilter'
// import { useTag } from '../hooks/useTag'
import type { DynamicTableAction, DynamicTableContextValues, DynamicTableProps } from '../types'
import { defaultContenxtValues } from '../types'
import TableTags from './components/TableTags.vue'

const emit = defineEmits(['row-click', 'change', 'search', 'row-add', 'row-select', 'row-delete'])
const attrs = useAttrs()
const props = withDefaults(defineProps<DynamicTableProps>(), {
  showToolbar: true,
  filters: () => []
})

const wrapRef = ref(null)
const innerProps = ref<Partial<DynamicTableProps>>()
const tableRef = ref<InstanceType<typeof Table>>()
const showFilter = ref(false)
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

const { filterFormItems, generateFilterFormItems } = useFilter(getProps)
generateFilterFormItems()

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

  console.log('setContextValues :: ', contextValues.value)
}
// const {} = useTag()

watch(
  filterFormItems,
  (filterFormItems) => {
    console.log('filters :: ', filterFormItems)
    setContextValues({ filterFormItems })
  },
  {
    immediate: true
  }
)

let dynamicTableAction: DynamicTableAction = {
  setProps,
  setContextValues,
  emitter: emit
}

const getBindValues = computed<Recordable>(() => {
  let propsData = {
    ...attrs,
    ...unref(getProps)
  }

  return propsData
})

const reload = (options: { isReset?: boolean }) => {
  tableRef.value?.getDataSource(options)
}

createDynamicTableContext({ wrapRef, ...dynamicTableAction, getContextValues, getBindValues })

defineExpose({
  getDataSource: tableRef.value?.getDataSource,
  getColumns: tableRef.value?.getColumns,
  reload,
  selectedRows: tableRef.value?.selectedRows
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
      .content {
        float: left;

        .table-toolbar {
          display: flex;
          justify-content: end;
        }
      }

      .filter-container {
        width: 25%;
        overflow-y: auto;
        height: calc(100vh - 240px);
        float: right;
      }
    }
  }
}
</style>
