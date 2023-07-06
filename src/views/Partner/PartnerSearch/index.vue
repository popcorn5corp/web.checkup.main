<script setup lang="ts" name="ParnerSearch">
import { TableFilter } from '@/components/Table'
import { dataSource, columns } from '@/components/Table/mock'
</script>

<template>
  <TableFilter :dataSource="dataSource" :columns="columns" />
</template>
