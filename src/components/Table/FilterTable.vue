<script setup lang="ts" name="LayoutFilter">
import { ref, type PropType, computed } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { Segmented } from 'ant-design-vue'
import { UnorderedListOutlined, TableOutlined } from '@ant-design/icons-vue'
import { useTag } from '@/hooks/useTag'

import Filter from './components/Filter.vue'
import { Table } from './index'
import { Button } from '@/components/Button'
import type { TableOptions } from './types'

const { config } = useProjectConfigStore()
const { tags, removeTag } = useTag()

const isRealDarkClass = computed(() => ({ 'tags-dark-mode': config.theme.navTheme === 'realDark' }))
const showFilter = ref<Boolean>(true)
const value = ref('table')

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
const options = ref([
  {
    value: 'table',
    payload: {
      icon: UnorderedListOutlined
    }
  },
  {
    value: 'img',
    payload: {
      icon: TableOutlined
    }
  }
])

const onClose = (options: LabelValueOptions, type = null) => removeTag(options, type)
</script>

<template>
  <div class="filter-table-containter">
    <div class="table-header">
      <div class="table-header-search">
        <a-input placeholder="게시물 제목으로 검색">
          <template #suffix>
            <font-awesome-icon style="color: #d9d9d9" :icon="['fas', 'magnifying-glass']" />
          </template>
        </a-input>
        <!-- <a-select placeholder="정렬" /> -->

        <Segmented v-model:value="value" :options="options">
          <template #label="{ value: val, payload = {} }">
            <div style="padding: 4px 4px">
              <template v-if="payload.icon">
                <a-avatar>
                  <template #icon>
                    <component :is="payload.icon" />
                  </template>
                </a-avatar>
              </template>
            </div>
          </template>
        </Segmented>
      </div>

      <div>
        <Button class="table-btn" :label="$t('common.filterText')" size="large"
          @click="showFilter = showFilter ? false : true" />
      </div>
    </div>

    <div class="table-body">
      <span v-if="dataSource.length !== null">{{
        $t('common.tableTotalText', { count: dataSource.length })
      }}</span>

      <div class="table-content-wrapper">
        <div class="table-content" :style="{ flex: showFilter ? 0.7 : 1 }">
          <div class="table-tags">
            <template v-for="tag in tags">
              <template v-for="{ label, value, type } in tag">
                <p v-if="value !== null" :class="isRealDarkClass">
                  <span>{{ label }}</span>
                  <span @click="onClose({ label, value }, type)"><font-awesome-icon :icon="['fas', 'xmark']" /></span>
                </p>
              </template>

              <template v-if="tag">
                <a-button>AllClear</a-button>
              </template>
            </template>
          </div>
          <Table :columns="columns" :dataSource="dataSource" :total="dataSource.length" :options="options" />
        </div>
        <Filter class="table-filter" v-if="showFilter" @showFilter="(flag: boolean) => (showFilter = flag)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0 1.5rem 0;

  .table-header-search {
    display: flex;
    flex: 1;
    gap: 10px;

    :deep(.ant-select-selector) {
      flex: 0.5;
      height: 44px;
      align-items: center;
      border-radius: 9px;
    }

    :deep(.ant-select) {
      width: 100%;
    }
  }

  .table-btn {
    margin-left: 0.5rem;
    font-weight: 600;
  }
}

.table-body {
  display: flex;
  flex-direction: column;

  >span {
    margin-bottom: 16px;
  }

  .table-content-wrapper {
    display: flex;
  }

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
        height: 38px;
        margin: 2px;
        background: rgb(0 0 0 / 3%);
        color: #000000;
        padding: 5px 16px;
        margin-bottom: 6px;
        border-color: rgba(0, 0, 0, 0.03);
        border-radius: 6px;
        font-weight: 500;
        font-size: 14px;
        gap: 14px;

        :nth-child(2) {
          cursor: pointer;
        }
      }
    }
  }

  .table-filter {
    flex: 0.3;
  }
}

.tags-dark-mode {
  background: transparent !important;
  color: white !important;
  border: 1px solid #666666 !important;
}

:deep(.ant-avatar) {
  background: transparent;
  color: $color-dark;
  font-size: 17px !important;
}

:deep(.ant-segmented),
:deep(.ant-input-affix-wrapper) {
  border-radius: 9px !important;
}

:deep(.ant-segmented-item-selected, ) {
  border-radius: 7px;
}
</style>
