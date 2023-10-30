<template>
  <div ref="wrapRef" class="dynamic-table-containter">
    <div class="header">
      <TableTags />

      <div class="table-btns">
        <Space>
          <slot name="tableBtns"></slot>

          <Button :label="$t('common.registration')" size="large" @click="$emit('row-add')" />

          <!-- 필터 버튼 -->
          <Button
            v-if="showFilter"
            type="primary"
            :label="$t('common.filterText')"
            size="large"
            @click="_showFilter = !_showFilter"
          />
        </Space>
      </div>
    </div>

    <Divider></Divider>

    <div class="body">
      <div class="content-wrapper">
        <div class="content" :style="{ width: props.showToolbar && _showFilter ? '75%' : '100%' }">
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
          v-if="_showFilter"
          @showFilter="(flag: boolean) => (_showFilter = flag)"
        ></FilterForm>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="DynamicTable">
import { Divider, Space } from 'ant-design-vue'
import { computed, ref, unref, useAttrs, useSlots } from 'vue'
import { Button } from '@/components/button'
import { FilterForm } from '@/components/filter-form'
import { Table } from '@/components/table'
import { createDynamicTableContext } from '../hooks/useDynamicTableContext'
import type { DynamicTableAction, DynamicTableEmits, DynamicTableProps } from '../types'
import TableTags from './components/TableTags.vue'

defineEmits(['row-click', 'change', 'search', 'row-add', 'row-select'])
const attrs = useAttrs()
const slots = useSlots()
const props = withDefaults(defineProps<DynamicTableProps>(), {
  showToolbar: false,
  showFilter: false
})

const wrapRef = ref(null)
const innerProps = ref<Partial<DynamicTableProps>>()
const tableRef = ref<InstanceType<typeof Table>>()
const _showFilter = ref(false)

const reload = (options: { isReset?: boolean }) => {
  tableRef.value?.getDataSource(options)
}

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

let dynamicTableAction: DynamicTableAction = {}
const getBindValues = computed<Recordable>(() => {
  let propsData = {
    ...attrs,
    ...unref(getProps)
  }

  return propsData
})

createDynamicTableContext({ wrapRef, ...dynamicTableAction, getBindValues })

defineExpose({
  getDataSource: tableRef.value?.getDataSource,
  getColumns: tableRef.value?.getColumns,
  reload
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
