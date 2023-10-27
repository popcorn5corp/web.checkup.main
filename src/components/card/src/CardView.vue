<template>
  <div class="pagination-container">
    <Pagination
      size="small"
      :current="pagination?.current"
      :pageSize="pagination?.pageSize"
      :show-size-changer="pagination?.showSizeChanger"
      :total="pagination?.total"
      v-bind="table.getBindValues"
      @change="$emit('cardTableChange')"
    />
  </div>

  <CardList
    :imgUrl="avatar1"
    :key="12"
    detailBtnText="상세보기"
    :useCheckbox="true"
    :content="dataSource"
    :detailBtnPosition="DetailPositionType.MIDDLE"
  />
</template>

<script lang="ts" setup>
import avatar1 from '@/assets/images/avatar1.png'
import { Pagination, type TableProps } from 'ant-design-vue'
import { computed, defineEmits, defineProps, ref, watch } from 'vue'
import { CardList } from '@/components/card'
import { DetailPositionType } from '@/components/card/types'
import { useTableContext } from '@/components/table/hooks/useTableContext'

// const props = withDefaults(defineProps<Object>(), {})

const table = useTableContext()
const pagination = table.getBindValues.value.pagination
const dataSource = computed(() => table.getBindValues.value.dataSource)
console.log(pagination, dataSource)

// const contentData = ref()
;(async () => {
  // contentData.value = table.getBindValues.value.dataSource
})()

defineEmits(['cardTableChange'])

const temp = (e: any) => {
  console.log(e)
  console.log('pagi', pagination)
  console.log('data', dataSource)
}

// const onChangePagination = (aaa) => {
//   table.getDataSource();
// }

watch(table, () => {
  console.log('watch', pagination)
})
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  justify-content: flex-end;
  .ant-pagination {
    margin: 16px 0;
  }
}
</style>
