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
  <!-- :imgUrl="avatar1" -->
  <CardList
    :key="12"
    detailBtnText="상세보기"
    :useCheckbox="true"
    :content="dataSource"
    :detailBtnPosition="'middle'"
  />
</template>

<script lang="ts" setup>
import avatar1 from '@/assets/images/avatar1.png'
import { Pagination } from 'ant-design-vue'
import { computed, defineEmits, watch } from 'vue'
import { CardList } from '@/components/card'
import { useTableContext } from '@/components/table/hooks/useTableContext'

// const props = withDefaults(defineProps<Object>(), {})

const table = useTableContext()
const pagination = table.getBindValues.value.pagination
const dataSource = computed(() => table.getBindValues.value.dataSource)
console.log(pagination, dataSource)

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
