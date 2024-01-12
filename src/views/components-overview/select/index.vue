<template>
  <div>
    <Card>
      <Select
        label="select label1"
        :options="userStatusOptions"
        placeholder="ssnsssn"
        width="50%"
      />
      <Select label="선택" :options="userStatusOptions" placeholder="placeholder" />
      <Select label="allowClear" :options="userStatusOptions" allowClear />
    </Card>
  </div>
</template>

<script setup lang="ts" name="ComponentsOverviewSelect">
import { Card, type SelectProps } from 'ant-design-vue'
import { ref } from 'vue'
import { Select } from '@/components/select'

const userStatusOptions = ref<SelectProps['options']>([
  {
    label: '활성',
    value: 'ACTIVE'
  },
  {
    label: '비활성',
    value: 'INACTIVE'
  },
  {
    label: '탈퇴',
    value: 'WITHDRAWN'
  },
  {
    label: '퇴출',
    value: 'REVOKE'
  }
])
</script>

<style scoped lang="scss">
:deep(.custom-select-container) {
  margin: 15px 0;
}
</style>
