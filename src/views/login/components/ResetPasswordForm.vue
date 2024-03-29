<template>
  <div class="reset-password-container">
    <template v-if="!isSuccess">
      <div class="title">
        {{ $t('page.login.resetPassword') }}
      </div>
      <Form :model="formData" @finish="onFinish">
        <FormItem name="password">
          <CustomInput
            type="password"
            v-model:value="formData.password"
            :isError="errorState.password"
            :label="$t('common.passwordText')"
            :min="8"
            @change="onValidateFields($event, 'password')"
          />
          <div class="errorMsg" v-if="errorState.password">
            {{ $t('message.validate.checkPassword') }}
          </div>
        </FormItem>
        <FormItem name="verifyPassword">
          <CustomInput
            type="password"
            v-model:value="formData.verifyPassword"
            :label="$t('common.rePasswordText')"
            :isError="errorState.verifyPassword"
            @change="onValidateFields($event, 'verifyPassword')"
          />
          <div class="errorMsg" v-if="errorState.verifyPassword">
            {{ $t('message.validate.checkVerifyPassword') }}
          </div>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            size="large"
            html-type="submit"
            :label="$t('component.button.ok')"
            :loading="isLoading"
          />
        </FormItem>
      </Form>
    </template>
    <template v-else>
      <div class="success-msg">
        {{ $t('page.login.successResetPassword') }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts" name="ResetPasswordForm">
import { AuthService } from '@/services'
import { reactive, ref } from 'vue'

import { CustomInput } from '@/components/input'

interface Props {
  uid: string
}
const props = withDefaults(defineProps<Props>(), {})

const formData = reactive<Record<string, string>>({
  password: '',
  verifyPassword: ''
})
const errorState = reactive<Record<string, boolean>>({
  password: false,
  verifyPassword: false
})

const isLoading = ref(false)
const isSuccess = ref(false)

const onValidateFields = (e: Event, value: string) => {
  const fieldsValue = (e.target as HTMLInputElement).value

  if (fieldsValue) {
    if (value === 'password') {
      errorState.password = fieldsValue.length < 8
    } else if (value === 'verifyPassword') {
      errorState.verifyPassword = formData.password !== fieldsValue
    }
  } else {
    errorState[value] = true
  }
}

const isFormValid = () => {
  Object.keys(formData).forEach((field) => {
    if (!formData[field]) {
      errorState[field] = true
    }
  })
  const { password, verifyPassword } = errorState
  if (password || verifyPassword) return false

  return true
}

const resetFields = () => {
  Object.keys(formData).forEach((field) => {
    errorState[field] = false
    formData[field] = ''
  })
}

const onFinish = async () => {
  if (!isFormValid()) return
  try {
    isLoading.value = true
    await AuthService.resetPassword({
      uid: props.uid,
      newPassword: formData.password
    })
    resetFields()
    isSuccess.value = true
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped lang="scss">
:deep(.custom-input) {
  padding: 10px 13px !important;
}
.reset-password-container {
  .title {
    font-size: 16px;
    text-align: left;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }

  .errorMsg {
    color: $color-feedback-error;
    font-size: 13px;
    text-align: left;
    text-wrap: nowrap;
    margin-top: 0.3rem;
    margin-left: 3px;
  }

  button {
    width: 100%;
    font-size: 16px;
    margin-top: 10px;
  }

  .success-msg {
    margin: 3rem 0;
    font-size: 15px;
    border: 1px solid $color-gray-5;
    padding: 2rem 0;
    border-radius: 8px;
  }
}
</style>
