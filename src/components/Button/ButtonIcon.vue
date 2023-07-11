<script setup lang="ts" name="ButtonIcon">
import { DownloadOutlined, PlusCircleOutlined, FileExcelOutlined } from '@ant-design/icons-vue'
defineOptions({
  name: 'ButtonIcon'
})

defineProps<{ icon?: string }>()
</script>
<template>
  <DownloadOutlined v-if="icon === 'download'" />
  <PlusCircleOutlined v-if="icon === 'plusCircle'" />
  <FileExcelOutlined v-if="icon === 'excel'" />
  <font-awesome-icon :icon="['fas', 'filter']" v-if="icon === 'filter'" />
</template>
