<script setup lang="ts">
import { DownloadOutlined, PlusCircleOutlined, FileExcelOutlined } from '@ant-design/icons-vue'

defineProps<{ icon?: string }>()
</script>
<template>
  <DownloadOutlined v-if="icon === 'download'" />
  <PlusCircleOutlined v-if="icon === 'plusCircle'" />
  <FileExcelOutlined v-if="icon === 'excel'" />
</template>
