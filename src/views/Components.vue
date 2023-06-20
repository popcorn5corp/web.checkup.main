<script setup lang="ts">
import { ref } from 'vue'
import { FileExcelOutlined } from '@ant-design/icons-vue'

import Button from '@/stories/Button/Button.vue'
import Table from '@/stories/Table/Table.vue'
import Badge from '@/stories/Badge/Badge.vue'

const dataSource = ref([
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street'
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
  }
])

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  }
]
</script>

<template>
  <main>
    <div style="margin-bottom: 3rem">
      <Button label="button">
        <template #icon>
          <FileExcelOutlined />
        </template>
      </Button>
    </div>

    <Table :dataSource="dataSource" :columns="columns" :total="dataSource.length" />

    <Badge text="Grapic Design" shape="round" size="large" theme="orange-outline" />
  </main>
</template>
