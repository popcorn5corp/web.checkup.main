<script setup lang="ts">
import { FilterTable } from '@/components/Table'
import { columns } from '@/components/Table/mock'
import { ref } from 'vue'
import BaseSampleService from '@/services/BaseSample/index'
import type { IBaseSample } from '@/services/BaseSample/interface'

defineOptions({
  name: 'TableSample'
})

const dataSource = ref<IBaseSample.ResGetBaseSample['posts']['content']>([])

BaseSampleService.getAll().then((res) => {
  dataSource.value = res.posts.content
})
</script>

<template>
  <FilterTable
    :dataSource="dataSource"
    :columns="columns"
    :options="{
      isShowNo: true
    }"
  />
</template>
