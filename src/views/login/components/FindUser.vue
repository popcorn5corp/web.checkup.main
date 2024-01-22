<template>
  <div class="find-user-container">
    <!-- <template v-if="props.type === 'id'"> -->
    <h2>{{ props.type === 'id' ? '아이디' : '비밀번호' }} 찾기</h2>
    <RadioGroup style="margin: 1rem" v-model:value="findType" size="large">
      <Radio value="phone">휴대폰 번호로 인증</Radio>
      <Radio value="email">e-mail로 인증</Radio>
    </RadioGroup>
    <template v-if="findType === 'phone'">
      <Form>
        <FormItem
          v-if="props.type === 'password'"
          :rules="[{ required: true, message: 'Please input your ID!' }]"
          style="margin-bottom: 0"
        >
          <Input :label="`아이디`" />
        </FormItem>
        <FormItem :rules="[{ required: true, message: 'Please input your name!' }]">
          <Input :label="`이름`" />
        </FormItem>
        <div class="phone-wrapper">
          <FormItem :rules="[{ required: true, message: 'Please input your phone!' }]">
            <Input :label="`핸드폰`" style="width: 100%" />
            <Button label="인증번호 전송" class="phone-btn" />
          </FormItem>
        </div>
        <FormItem :rules="[{ required: true, message: 'Please input your certification number!' }]">
          <Input :label="`인증번호`" />
        </FormItem>
      </Form>
    </template>
    <template v-else>
      <Form>
        <FormItem :rules="[{ required: true, message: 'Please input your name!' }]">
          <Input :label="`이름`" />
        </FormItem>
        <div class="phone-wrapper">
          <FormItem :rules="[{ required: true, message: 'Please input your phone!' }]">
            <Input :label="`핸드폰`" style="width: 100%" />
            <Button label="인증번호 전송" class="phone-btn" />
          </FormItem>
        </div>
        <FormItem :rules="[{ required: true, message: 'Please input your certification number!' }]">
          <Input :label="`인증번호`" />
        </FormItem>
      </Form>
    </template>
    <Button
      label="다음"
      html-type="submit"
      style="width: 100%; margin-top: 10px"
      type="primary"
      size="large"
    />
  </div>
</template>

<script setup lang="ts" name="FindUser">
import { InputGroup, Radio, RadioGroup } from 'ant-design-vue'
import { ref } from 'vue'
import { FormItem } from '@/components/form'
import { Input } from '@/components/input'

interface Props {
  type: 'id' | 'password'
}
const props = withDefaults(defineProps<Props>(), {})
const findType = ref('phone')
const data = ref(['휴대폰 번호로 인증', 'e-mail로 인증'])
</script>

<style lang="scss" scoped>
.find-user-container {
  width: 100%;

  .phone-wrapper {
    .custom-input-container {
      margin: 0;
    }
    :deep(.ant-form-item-control-input-content) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }
  }

  .phone-btn {
    height: 43px;
    border: 1.5px solid #d9d9d9;
    border-radius: 8px;
    padding: 5px 7px;
    // color: $color-primary;
  }
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
