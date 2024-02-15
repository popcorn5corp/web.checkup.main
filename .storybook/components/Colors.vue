<template>
  <div>Alias color tokens</div>
  <Table style="width: 100%" :dataSource="dataSource" :columns="columns" :pagination="false">
    <template #bodyCell="{ record }">
      <template v-if="record.token"></template>
    </template>
  </Table>
</template>
<script setup lang="ts">
import { Table } from 'ant-design-vue'
import { ref } from 'vue'

const columns = [
  {
    title: 'Token',
    dataIndex: 'token',
    width: 150
  },
  {
    title: 'Value',
    dataIndex: 'value',
    width: 150
  },
  {
    title: 'Example',
    dataIndex: 'example'
  }
]

const dataSource = [
  {
    token: 'pharos-color-interactive-primary',
    value: '$pharos-color-jstor-red #990000',
    example: 'asdf'
  }
]
</script>

<style lang="scss" scoped></style>
