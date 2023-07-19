<script setup lang="ts" name="TableSample">
import { FilterTable } from '@/components/Table'
import { dataSource, columns } from '@/components/Table/mock'
</script>

<template>
  <FilterTable :dataSource="dataSource" :columns="columns" />
</template>
