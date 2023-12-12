<template>
  <div class="list-item-meta-wrapper">
    <ListItemMeta v-bind="{ ...props }">
      <template #title>
        <slot name="title" />
        <span class="description"><slot name="content"> </slot></span>
      </template>
      <template #avatar><slot name="avatar" /></template>
    </ListItemMeta>
  </div>
</template>

<script setup lang="ts" name="ListItemMeta">
import { ListItemMeta } from 'ant-design-vue'
import type { ListItemMetaProps } from '../types'

const props = defineProps<ListItemMetaProps>()
</script>

<style scoped lang="scss">
.list-item-meta-wrapper {
  display: contents;
}
.description {
  color: rgba(0, 0, 0, 0.45);
  margin-left: 7px;
  font-size: 12px;
  line-height: 1.6153846153846154;
}

:deep(.ant-list-item-meta) {
  align-items: center !important;
}

:deep(.ant-list-item-meta-title) {
  font-weight: 700;
}
</style>
