<template>
  <TabPane v-bind="{ ...$attrs }">
    <!-- @vue-skip -->
    <template v-for="(_, key) in $slots" #[key]>
      <slot :name="key"></slot>
    </template>
  </TabPane>
</template>
<script setup lang="ts" name="TabPane">
import { TabPane } from 'ant-design-vue'
import type { TabPaneProps } from '../interface'

defineProps<TabPaneProps>()
</script>
<style lang="scss" scoped></style>
