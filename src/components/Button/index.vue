<script setup lang="ts">
import { Button } from '@/stories'
import { DownloadOutlined, PlusCircleOutlined, FileExcelOutlined } from '@ant-design/icons-vue'

const onClick = () => {
  console.log('on Click')
}
</script>

<template>
  <Button size="small" @click="onClick" label="button"
    ><template #icon><PlusCircleOutlined /></template
  ></Button>
</template>
