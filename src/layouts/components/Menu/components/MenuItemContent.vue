<template>
  <!-- <icon-font :type="item?.meta?.icon" /> -->
  <!-- <TitleI18n :title="item?.meta?.title" /> -->
  <div>
    {{ props.item.name }}
  </div>
</template>

<script setup lang="ts" name="MenuItemContent">
import type { RouteRecordRaw } from 'vue-router'
// import { IconFont } from '@/components/basic/iconfont'
// import { TitleI18n } from '@/components/basic/title-i18n'

defineOptions({
  name: 'MenuItemContent'
})

interface Props {
  item: RouteRecordRaw
}

const props = withDefaults(defineProps<Props>(), {
  item: undefined
})

console.log('props >> ', props.item)
</script>
