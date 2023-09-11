<template>
  <TabPane v-bind="{ ...$attrs, ...props }">
    <!-- @vue-skip -->
    <template v-for="(_, key) in $slots" #[key]>
      <slot :name="key"></slot>
    </template>

    <slot />
  </TabPane>
</template>
<script setup lang="ts" name="TabPane">
import { TabPane } from 'ant-design-vue'
// import { useAttrs } from 'vue'
import type { TabPaneProps } from '../interface'

defineOptions({
  inheritAttrs: true
})

// const attrs = useAttrs()

const props = defineProps<TabPaneProps>()
</script>
<style lang="scss" scoped></style>
