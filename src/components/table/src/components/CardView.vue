<template>
  <div class="card-view-container">
    <Spin :spinning="loading">
      <div class="pagination-wrapper">
        <Pagination
          v-if="cardData.length"
          size="small"
          :current="pagination.current"
          :pageSize="pagination.pageSize"
          :show-size-changer="pagination.showSizeChanger"
          :total="pagination.total"
          @change="onPagination"
        />
      </div>

      <CardList
        v-if="cardData.length"
        ref="cardListRef"
        :rowKey="props.rowKey"
        :items="cardData"
        :useCheckbox="true"
        :size="size"
        :detailBtnPosition="'bottom'"
        @click="onClickDetail"
        @select-rows="onSelectRows"
      />

      <div v-else :class="['img-wrapper']">
        <img :src="EmptyImage" />
        <div>{{ $t('common.message.noData') }}</div>
      </div>
    </Spin>
  </div>
</template>

<script lang="ts" setup name="CardView">
import { Pagination, type PaginationProps, Spin } from 'ant-design-vue'
import { computed, ref, unref, watch } from 'vue'
import type { ComputedRef } from 'vue'
import { CardList } from '@/components/card'
import { useTableContext } from '@/components/table/hooks/useTableContext'
import type { CardSize, TablePagination } from '../../types'
import EmptyImage from '../images/no_data_2.png'

interface CardViewProps {
  rowKey: string
}

const props = defineProps<CardViewProps>()
const table = useTableContext()
const cardListRef = ref<InstanceType<typeof CardList>>()
const loading = computed(() => table.getLoading())
const cardData = computed(() => table.getCardData())
const pagination = computed(
  () => unref(table.getBindValues).pagination
) as ComputedRef<TablePagination>
const size = computed(() => table.getSize() as CardSize)

watch(
  () => unref(table.getContextValues).showSelectionPopup,
  (showSelectionPopup) => {
    if (!showSelectionPopup) {
      cardListRef.value?.initCardChecked()
    }
  }
)

const onClickDetail = (card: Recordable) => {
  table.emitter('row-click', card)
}

const onSelectRows = (selectedRows: Recordable[]) => {
  table.setSelectedRows(selectedRows)
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

  .img-wrapper {
    text-align: center;
    color: $sub-text-color;

    > img {
      width: 200px;
    }
  }
}
</style>
