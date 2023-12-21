<template>
  <div class="list-container">
    <List class="demo-loadmore-list" v-bind="{ ...props }">
      <template #loadMore>
        <slot name="loadMore" />
      </template>

      <template #renderItem="{ item }">
        <slot name="renderItem" :item="item" />
      </template>

      <slot />
    </List>
  </div>
</template>

<script setup lang="ts" name="List">
import { List } from 'ant-design-vue'
import type { ListProps } from '../types'

const props = withDefaults(defineProps<ListProps>(), {
  itemLayout: 'horizontal'
})
</script>

<style lang="scss" scoped>
.list-wrapper {
  .demo-loadmore-list {
    min-height: 350px;
  }
}
</style>
