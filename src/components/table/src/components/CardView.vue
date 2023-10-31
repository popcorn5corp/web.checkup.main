<template>
  <div class="card-view-container">
    <Spin :spinning="loading">
      <div class="pagination-wrapper">
        <Pagination
          size="small"
          :current="pagination.current"
          :pageSize="pagination.pageSize"
          :show-size-changer="pagination.showSizeChanger"
          :total="pagination.total"
          @change="onPagination"
        />
      </div>
      <!-- :imgUrl="avatar1" -->

      <CardList
        :detailBtnText="$t('component.button.viewDetail')"
        :useCheckbox="true"
        :content="dataSource"
        :detailBtnPosition="'middle'"
        @click="onClickDetail"
      />
    </Spin>
  </div>
</template>

<script lang="ts" setup name="CardView">
// import avatar1 from '@/assets/images/avatar1.png'
import { Pagination, type PaginationProps, Spin } from 'ant-design-vue'
import { computed, unref, watch } from 'vue'
import type { ComputedRef } from 'vue'
import { CardList } from '@/components/card'
import { useTableContext } from '@/components/table/hooks/useTableContext'
import type { TablePagination } from '../../types'

const table = useTableContext()
const loading = computed(() => table.getLoading())
const dataSource = computed(() => table.getDataSource())
const pagination = computed(
  () => unref(table.getBindValues).pagination
) as ComputedRef<TablePagination>

;(async () => {
  await table.fetchDataSource()
})()

watch(
  () => table.getSize(),
  (cardSize) => {
    console.log('cardSize 변경 ', cardSize)
  }
)

const onClickDetail = (card: Recordable) => {
  table.emitter('row-click', card)
}

const onPagination: PaginationProps['onChange'] = (current: number, pageSize: number) => {
  pagination.value.current = current
  pagination.value.pageSize = pageSize
  table.setPagination(current, pageSize)
}
</script>

<style lang="scss" scoped>
.card-view-container {
  .pagination-wrapper {
    display: flex;
    justify-content: flex-end;
    :deep(.ant-pagination) {
      margin: 16px 0;
    }
  }
}
</style>
