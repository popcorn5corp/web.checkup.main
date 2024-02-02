<template>
  <div>
    <Card>
      <Input
        label="이메일"
        class="input"
        placeholder="이메일을 입력해주세요."
        style="font-size: 16px; width: 300px"
        allowClear
        @pressEnter="onPressEnter"
        @change="onChange"
      />
      <Input label="email" style="width: 300px" allowClear />
      <Input label="username" placeholder="input username" :maxlength="4" showCount />
      <Input label="password" type="password" />
    </Card>
  </div>
</template>

<script setup lang="ts" name="ComponentsOverviewInput">
import { Card } from 'ant-design-vue'
import { Input } from '@/components/input'

const onPressEnter = () => {
  console.log('input press enter')
}

const onChange = () => {
  console.log('input change')
}
</script>

<style scoped lang="scss">
:deep(.custom-input-container) {
  margin: 15px 0;
}
</style>
