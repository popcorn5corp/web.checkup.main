<script setup lang="ts">
import { TableFilter } from '@/components/Table'
import { columns } from '@/components/Table/mock'
import { ref } from 'vue';
import BaseSampleService from '@/api/BaseSample/index'
import type { IBaseSample } from '@/api/BaseSample/interface';

defineOptions({
  name: 'TableSample'
})

const dataSource = ref<IBaseSample.ResGetBaseSample['posts']['content']>([]);

BaseSampleService.getAll().then((res) => {
  dataSource.value = res.posts.content;
})


</script>

<template>
  <TableFilter :dataSource="dataSource" :columns="columns" :options="{
    isShowNo: true
  }" />
</template>
