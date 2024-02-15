<template>
  <div>
    <Card>
      <Input
        label="이메일"
        class="input"
        v-model:value="inputData.emailKo"
        placeholder="example@checkupv.com"
        style="font-size: 16px; width: 300px"
        allowClear
        @pressEnter="onPressEnter"
        @change="onChange"
      />
      <Input v-model:value="inputData.emailEn" label="email" style="width: 300px" allowClear />
      <Input
        v-model:value="inputData.name"
        label="username"
        placeholder="input username"
        :maxlength="4"
        showCount
      />
      <Input v-model:value="inputData.password" label="password" type="password" />
    </Card>
  </div>
</template>

<script setup lang="ts" name="ComponentsOverviewInput">
import { Card } from 'ant-design-vue'
import { reactive } from 'vue'
import { Input } from '@/components/input'

const inputData = reactive({
  emailKo: '',
  emailEn: '',
  name: '',
  password: ''
})

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
