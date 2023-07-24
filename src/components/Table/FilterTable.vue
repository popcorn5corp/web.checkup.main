<script setup lang="ts" name="LayoutFilter">
import { ref, type PropType, computed } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { useTag } from '@/hooks/useTag'

import Filter from './components/Filter.vue'
import { Table } from './index'
import { Button } from '@/components/Button'
import type { TableOptions } from './types'

const { config } = useProjectConfigStore()
const { tags, removeTag } = useTag()

const isRealDarkClass = computed(() => ({ 'tags-dark-mode': config.theme.navTheme === 'realDark' }))
const showFilter = ref<Boolean>(true)

defineProps({
  dataSource: {
    type: Array as PropType<Object[]>,
    default: () => []
  },
  columns: {
    type: Array as PropType<Object[]>,
    default: () => []
  },
  options: {
    type: Object as PropType<TableOptions>
  }
})

const onClose = (options, type = null) => {
  removeTag(options, type)
}
</script>

<template>
  <div class="filter-table-containter">
    <div class="table-header">
      <div class="table-header-search">
        <a-input placeholder="search">
          <template #prefix>
            <font-awesome-icon style="color: #d9d9d9" :icon="['fas', 'magnifying-glass']" />
          </template>
        </a-input>
        <a-select placeholder="Select" />
      </div>

      <div>
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
    </div>

    <div class="table-body">
      <div class="table-content" :style="{ flex: showFilter ? 0.7 : 1 }">
        <div class="table-tags">
          <template v-for="tag in tags">
            <template v-for="{ label, value, type } in tag">
              <p :class="isRealDarkClass" @click="onClose({ label, value }, type)">
                <span>{{ label }}</span>
                <span><font-awesome-icon :icon="['fas', 'xmark']" /></span>
              </p>
            </template>
          </template>
        </div>
        <Table
          :columns="columns"
          :dataSource="dataSource"
          :total="dataSource.length"
          :options="options"
        />
      </div>
      <Filter
        class="table-filter"
        v-if="showFilter"
        @showFilter="(flag: boolean) => (showFilter = flag)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  .table-header-search {
    display: flex;
    flex: 0.7;
    gap: 10px;
    span,
    :deep(.ant-select-selector) {
      flex: 0.5;
      height: 40px;
      align-items: center;
    }
    :deep(.ant-select) {
      flex: 0.5;
    }
  }

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

    .table-tags {
      display: flex;
      flex-wrap: wrap;
      p {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 30px;
        margin: 2px;
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

.tags-dark-mode {
  background: transparent !important;
  color: white !important;
  border: 1px solid #666666 !important;
}
</style>
