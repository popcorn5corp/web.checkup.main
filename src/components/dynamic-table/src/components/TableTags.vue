<script setup lang="ts" name="TableTags">
import { computed, unref } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { Button } from '@/components/button'
import type { FilterFormItem } from '@/components/filter-form'
import type { FilterItem } from '@/components/filter-form/types'
import { useDynamicTableContext } from '../../hooks/useDynamicTableContext'

interface TableTagsProps {
  items: FilterFormItem[]
}

const props = defineProps<TableTagsProps>()
const dynamicTable = useDynamicTableContext()
const { config } = useProjectConfigStore()
const tagList = computed(() => props.items)
const isShowClearBtn = computed(() => unref(tagList).some((item) => item.selectedItems.length > 0))
const getDarkModeClass = computed(() => ({
  'dark-mode': config.theme.navTheme === 'realDark'
}))

const onRemove = (tag: FilterFormItem, removeItem: FilterItem) => {
  const { type, selectedItems } = tag

  // RangeDatePicker일 경우, start/end 둘다 제거
  const _selectedItems =
    type === 'RangeDatePicker'
      ? []
      : selectedItems.filter((item) => {
          return item.value !== removeItem.value
        })

  const filterFormItem: FilterFormItem = {
    ...tag,
    selectedItems: _selectedItems
  }

  dynamicTable.setFilterFormItem(filterFormItem)
}
</script>
<template>
  <div class="table-tags-container">
    <template v-for="tag in tagList" :key="tag.key">
      <template v-for="(item, index) in tag.selectedItems" :key="index">
        <span v-if="item.value !== null" class="table-tag" :class="getDarkModeClass">
          <span>{{ item.label }}</span>
          <span @click="onRemove(tag, item)"><font-awesome-icon :icon="['fas', 'xmark']" /></span>
        </span>
      </template>
    </template>

    <Button
      v-if="isShowClearBtn"
      class="table-tag"
      :class="getDarkModeClass"
      label="초기화"
      @click="dynamicTable.clearSelectedItems()"
    />
  </div>
</template>
<style lang="scss" scoped>
.table-tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  .table-tag {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    background: rgb(0 0 0 / 3%);
    color: #000000;
    padding: 5px 16px;
    border-color: rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    font-weight: 500;
    font-size: 14px;
    gap: 14px;

    &.dark-mode {
      background: $color-dark;
      color: $color-white;
    }

    :nth-child(2) {
      cursor: pointer;
    }
  }
}
</style>
