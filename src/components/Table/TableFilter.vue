<script setup lang="ts" name="LayoutFilter">
import { ref, type PropType } from 'vue'
import { storeToRefs } from 'pinia'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import Filter from './components/Filter.vue'
import { Table } from './index'
import { Button } from '@/components/Button'

const store = useTableFilterStore()
const { filterList, selectedItems } = storeToRefs(store)
const showFilter = ref<Boolean>(true)

defineProps({
  dataSource: {
    type: Array as PropType<String[]>,
    default: () => []
  },
  columns: {
    type: Array as PropType<String[]>,
    default: () => []
  }
})
</script>

<template>
  <div class="filter-table-containter">
    <div class="table-header">
      <span v-if="dataSource.length !== null">{{
        $t('common.tableTotalText', { count: dataSource.length })
      }}</span>
      <Button
        class="table-btn"
        :label="$t('common.filterText')"
        size="large"
        @click="showFilter = showFilter ? false : true"
      />
    </div>

    <div class="table-body">
      <div class="table-content" :style="{ flex: showFilter ? 0.7 : 1 }">
        <template v-for="item in selectedItems">
          <a-tag class="table-tag" closable @close="">{{ item }}</a-tag>
        </template>
        <Table :columns="columns" :dataSource="dataSource" :total="dataSource.length" />
      </div>
      <Filter
        class="table-filter"
        v-if="showFilter"
        :filterList="filterList"
        @showFilter="(flag:boolean) => (showFilter = flag)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1rem;

  .table-btn {
    margin-left: 0.5rem;
    font-weight: 600;
  }
}
.table-body {
  display: flex;
  .table-content {
    flex: 0.7;
    :deep(.table-wrapper) {
      width: 100%;
    }

    .table-tag {
      background: rgb(0 0 0 / 3%);
      color: #000000;
      padding: 5px 16px;
      margin-bottom: 6px;
      border-color: rgba(0, 0, 0, 0.03);
      border-radius: 6px;
      font-weight: 500;
      font-size: 14px;
    }
  }

  .table-filter {
    flex: 0.3;
  }
}

.badge-custom {
  margin-right: 5px;
  padding: 0.5rem 0.7rem !important;
  margin: 0 8px 8px 0;
  cursor: pointer;
  &:after {
    content: '\58';
    margin-left: 8px;
  }
}
</style>
