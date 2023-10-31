<template>
  <Table
    ref="tableRef"
    v-bind="table.getBindValues"
    :scroll="{ y: 530 }"
    @change="table.changeTable"
  >
    <!-- @vue-skip -->
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template #bodyCell="{ record, column, index, text }">
      <template v-if="column">
        <template v-if="column.key === 'index'">
          {{ table.getRecordNo(index) }}
        </template>
      </template>

      <slot name="bodyCell" :record="record" :column="column" :index="index" :text="text" />
    </template>

    <template #emptyText>
      <img :src="EmptyImage" style="width: 200px" />
      <div>{{ $t('common.message.noData') }}</div>
    </template>
  </Table>
</template>
<script setup lang="ts" name="TableView">
import { Table } from 'ant-design-vue'
import { useTableContext } from '../../hooks/useTableContext'
import EmptyImage from '../images/no_data_2.png'

const table = useTableContext()
// const { customRow } = useCustomRow({ emit })

console.log('ggg ', table.getBindValues)

/**
 * @description Table 컴포넌트 초기 세팅
 */
;(async () => {
  await table.fetchDataSource()

  // if (props.columns) {
  //   await setColumns()
  // }
})()
</script>
<style lang="scss" scoped></style>
