<template>
  <div class="find-user-container">
    <h2>{{ props.type === 'id' ? '아이디' : '비밀번호' }} 찾기</h2>
    <RadioGroup style="margin: 1rem" v-model:value="certificationType" size="large">
      <Radio value="phone">휴대폰 번호로 인증</Radio>
      <Radio value="email">e-mail로 인증</Radio>
    </RadioGroup>
    <FindUserForm :findType="props.type" :certificationType="certificationType" />
  </div>
</template>

<script setup lang="ts" name="FindUser">
import { Radio, RadioGroup } from 'ant-design-vue'
import { reactive, ref } from 'vue'
import { FormItem } from '@/components/form'
import { Input } from '@/components/input'
import FindUserForm from './FindUserForm.vue'

export interface FindProps {
  type: 'id' | 'password'
}
const props = withDefaults(defineProps<FindProps>(), {})
const certificationType = ref('phone')
</script>

<style lang="scss" scoped>
.find-user-container {
  width: 100%;
}
.ant-radio-group {
  label {
    font-size: 15px;
  }
}
:deep(.ant-form) {
  .ant-form-item {
    margin: 0;
    // margin-bottom: 10px;
  }
  .form-item-wrapper {
    margin-bottom: 10px;
  }
}
</style>
