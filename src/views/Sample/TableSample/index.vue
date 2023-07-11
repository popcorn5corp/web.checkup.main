<script setup lang="ts" name="TableSample">
import { TableFilter } from '@/components/Table'
import { dataSource, columns } from '@/components/Table/mock'
</script>

<template>
  <TableFilter :dataSource="dataSource" :columns="columns" />
</template>
