<script setup lang="ts" name="TableTags">
import { computed, toRefs, watch } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { Button } from '@/components/button'
import type { FilterFormItem } from '@/components/filter-form'
import { useTag } from '../../hooks/useTag'

interface TableTagsProps {
  items: FilterFormItem[]
}

const props = defineProps<TableTagsProps>()
const { items } = toRefs(props)
const tagList = computed(() => props.items)
// const { remove } = useTag()

watch(
  () => props.items,
  () => {},
  {
    deep: true
  }
)

const { config } = useProjectConfigStore()
// const { tags, removeTag, initTag } = useTag()
const getDarkModeClass = computed(() => ({
  'dark-mode': config.theme.navTheme === 'realDark'
}))

const onRemove = (tag: FilterFormItem, removeIndex: number) => {}

const onClear = () => {
  // initTag()
}
</script>
<template>
  <div class="table-tags-container">
    <template v-for="tag in tagList" :key="tag.key">
      <template v-for="(item, index) in tag.selectedItems" :key="index">
        <p v-if="item.value !== null" class="table-tag" :class="getDarkModeClass">
          <span>{{ item.label }}</span>
          <span @click="onRemove(tag, index)"><font-awesome-icon :icon="['fas', 'xmark']" /></span>
        </p>
      </template>
    </template>

    <!-- <Button v-if="tagList.length > 0" class="table-tag" label="초기화" @click="onClear" /> -->
  </div>
</template>
<style lang="scss" scoped>
.table-tags-container {
  display: flex;
  flex-wrap: wrap;

  .table-tag {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 38px;
    margin: 2px;
    background: rgb(0 0 0 / 3%);
    color: #000000;
    padding: 5px 16px;
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
</style>
