<template>
  <div class="table-segmented-button">
    <Segmented
      :ref="(ref) => tour.setTour(9, ref as Element)"
      v-model:value="tableLayoutType"
      :options="options"
      @change="onChangeLayoutType"
      size="small"
    >
      <template #label="{ value: val, payload = {} }">
        <div style="padding: 4px 4px">
          <template v-if="payload.icon">
            <component :is="payload.icon" />
          </template>
        </div>
      </template>
    </Segmented>
  </div>
</template>

<script setup lang="ts" name="TableSegmentButton">
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons-vue'
import { Segmented } from 'ant-design-vue'
import type { SegmentedValue } from 'ant-design-vue/es/segmented/src/segmented'
import { type Component, ref } from 'vue'
import { useTour } from '@/components/tour/hooks/useTour'
import { useTableContext } from '../../hooks/useTableContext'
import type { TableLayoutMode } from '../../types'

const table = useTableContext()
const tour = useTour()
const tableLayoutType = ref<TableLayoutMode>('table')
const options = ref<Array<{ value: TableLayoutMode; payload: { icon: Component } }>>([
  {
    value: 'table',
    payload: {
      icon: UnorderedListOutlined
    }
  },
  {
    value: 'card',
    payload: {
      icon: TableOutlined
    }
  }
])

async function onChangeLayoutType(val: SegmentedValue) {
  table.setContextValues({
    layoutMode: val as TableLayoutMode
  })
}
</script>

<style lang="scss" scoped>
.table-segmented-button {
  :deep(.ant-segmented) {
    font-size: 1rem;

    .ant-segmented-item-selected {
      border-radius: 7px;
    }
  }
}
</style>
