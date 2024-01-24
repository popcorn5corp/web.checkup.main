<template>
  <div class="find-user-form-container">
    <Form :model="formData" :rules="rules" @validate="onValidate" @finish="onFinish">
      <FormItem name="id" v-if="props.findType === 'password'">
        <Input :label="`아이디`" />
      </FormItem>
      <FormItem name="name">
        <Input :label="`이름`" />
      </FormItem>
      <div class="certification-wrapper">
        <template v-if="props.certificationType === 'email'">
          <!-- email로 인증 -->
          <FormItem name="email">
            <Input :label="`이메일`" style="width: 100%" />
            <Button label="인증번호 전송" class="certification-btn" />
          </FormItem>
        </template>
        <template v-else>
          <!-- phone으로 인증 -->
          <FormItem name="phone">
            <Input :label="`핸드폰`" style="width: 100%" />
            <Button label="인증번호 전송" class="certification-btn" />
          </FormItem>
        </template>
      </div>
      <FormItem name="certificationNumber">
        <Input :label="`인증번호`" />
      </FormItem>
      <Button
        label="다음"
        html-type="submit"
        type="primary"
        size="large"
        class="next-btn"
        @click="isFormComplete = true"
      />
    </Form>
  </div>
</template>

<script setup lang="ts" name="FindUserForm">
import { message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { reactive } from 'vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { FormItem } from '@/components/form'
import { Input } from '@/components/input'

interface Props {
  findType: string
  certificationType: string
}
const props = withDefaults(defineProps<Props>(), {
  certificationType: 'phone'
})
const { t } = useI18n()

const formData = reactive<Record<string, string | boolean>>({
  id: '',
  name: '',
  email: '',
  phone: '',
  certificationNumber: ''
})
const isLoading = ref(false)
const isFormComplete = ref(false)

const rules: Record<string, Rule[]> = {
  id: [{ required: true, message: 'Please input your ID!', trigger: 'change' }],
  name: [{ required: true, message: 'Please input your name!', trigger: 'change' }],
  email: [{ required: true, message: 'Please input your email!', trigger: 'change' }],
  phone: [{ required: true, message: 'Please input your phone!', trigger: 'change' }],
  certificationNumber: [
    { required: true, message: 'Please input your certificationNumber!', trigger: 'change' }
  ]
}

const onValidate = (...args: [string, boolean, string[]]) => {
  console.log(args)
  if (!args[1]) {
    return message.error(t('common.message.signUpValidate'))
  } else {
    // 패스워드, 패스워드확인 같은지 검사
    if (formData.password !== formData.verifyPassword) {
      return message.error(t('common.message.checkPassword'))
    }
  }
}
const onFinish = async () => {
  try {
    isLoading.value = true
    // for (let k in formData) {
    //   formData[k] = formData[k].trim()
    // }
    // const { email, password, name, phone } = formData
    // const { data } = await AuthService.signUp({
    //   userId: email,
    //   email,
    //   password,
    //   name,
    //   phone
    // })
    // console.log(data)
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped lang="scss">
.certification-wrapper {
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
  .certification-btn {
    height: 43px;
    border: 1.5px solid #d9d9d9;
    border-radius: 8px;
    padding: 5px 7px;
  }
}

.next-btn {
  width: 100%;
  margin-top: 10px;
  font-size: 15px;
}
</style>
