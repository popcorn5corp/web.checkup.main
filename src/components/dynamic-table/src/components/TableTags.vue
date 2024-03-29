<template>
  <div class="table-tags-container">
    <!-- <template v-for="tag in tagList" :key="tag.key">
      <template v-for="(item, index) in tag.selectedItems" :key="index">
        <span v-if="item.value !== null" class="table-tag">
          <span>{{ item.label }}</span>
          <span @click="onRemove(tag, item)"><font-awesome-icon :icon="['fas', 'xmark']" /></span>
        </span>
      </template>
    </template> -->

    <Button
      v-if="isShowClearBtn"
      class="table-tag"
      :label="`${getCount} ${$t('component.button.reset')}`"
      @click="dynamicTable.clearSelectedItems()"
    />
  </div>
</template>

<script setup lang="ts" name="TableTags">
import { computed, unref } from 'vue'
import { Button } from '@/components/button'
import type { FilterFormItem } from '@/components/filter-form'
import type { FilterItem } from '@/components/filter-form/types'
import { useDynamicTableContext } from '../../hooks/useDynamicTableContext'

interface TableTagsProps {
  items: FilterFormItem[]
}

const props = defineProps<TableTagsProps>()
const dynamicTable = useDynamicTableContext()

const tagList = computed(() => props.items)

const getCount = computed(() => dynamicTable.getSelectedItemsCount())

const isShowClearBtn = computed(() => unref(tagList).some((item) => item.selectedItems.length > 0))

const onRemove = (tag: FilterFormItem, removeItem: FilterItem) => {
  const { selectedItems, removeAll } = tag
  const filterFormItem: FilterFormItem = {
    ...tag,
    selectedItems: removeAll
      ? []
      : selectedItems.filter((item) => {
          return item.value !== removeItem.value
        })
  }

  dynamicTable.setFilterFormItem(filterFormItem)
}
</script>

<style lang="scss" scoped>
.table-tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  .table-tag {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // height: 32px;
    // background: rgb(0 0 0 / 3%);
    // color: #000000;
    // padding: 5px 16px;
    // border-color: rgba(0, 0, 0, 0.03);
    // border-radius: 6px;
    // font-weight: 500;
    // font-size: 14px;
    // gap: 14px;
    margin-left: 3px;
    height: 29px;
    border: 1px solid #d9d9d9;
    border-radius: 23px;
    padding: 3px 18px;
    &:hover {
      background: #f0f4f8;
    }

    :nth-child(2) {
      cursor: pointer;
    }
  }
}
</style>
