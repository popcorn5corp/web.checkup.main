<template>
  <div class="sign-in-container">
    <h1 class="text text-title">{{ $t('component.button.loginText') }}</h1>
    <Form :model="formData" @finish="onLogin">
      <FormItem name="userId">
        <CustomInput
          id="loginEmail"
          type="email"
          v-model:value="formData.userId"
          placeholder="example@gmail.com"
          :label="$t('common.idText')"
          :isError="errorState.userId"
          @change="onValidateFields($event, 'userId')"
        />
        <div class="errorMsg" v-if="errorState.userId">
          {{ $t('message.validate.checkEmail') }}
        </div>
      </FormItem>
      <FormItem name="password">
        <CustomInput
          id="loginPassword"
          type="password"
          v-model:value="formData.password"
          :label="$t('common.passwordText')"
          :isError="errorState.password"
          @change="onValidateFields($event, 'password')"
        />
        <div class="errorMsg" v-if="errorState.password">
          {{ $t('message.validate.checkPassword') }}
        </div>
      </FormItem>
      <FormItem>
        <Button
          :label="$t('component.button.loginText')"
          type="primary"
          size="large"
          html-type="submit"
          :loading="getLoggedIn"
        />
      </FormItem>
    </Form>
  </div>
</template>

<script setup lang="ts" name="SignIn">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import type { IAuth } from '@/services/auth/types'

import { useAuthStore } from '@/stores/modules/auth'

import { CustomInput } from '@/components/input'

interface Props {
  onToggle: () => void
  isSuccessLogin?: boolean
}

// const emit = defineEmits(['update:isSuccessLogin'])
withDefaults(defineProps<Props>(), {})

const router = useRouter()
const { login, getLoggedIn } = useAuthStore()

const formData = reactive<IAuth.SignInParam>({
  userId: '',
  password: ''
})
const errorState = reactive<Record<string, boolean>>({
  userId: false,
  password: false
})

const onValidateFields = (e: Event, value: string) => {
  const fieldsValue = (e.target as HTMLInputElement).value
  if (fieldsValue) {
    errorState[value] = !fieldsValue
  } else {
    errorState[value] = true
  }
}

const onLogin = async () => {
  ;(Object.keys(formData) as Array<keyof typeof formData>).forEach((field) => {
    if (!formData[field]) {
      errorState[field] = true
    }
  })

  const { userId, password } = errorState
  if (userId || password) {
    return
  }

  try {
    const { goPath } = await login(formData)
    router.push(goPath)
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss" scoped>
.sign-in {
  .text {
    font-family: inherit;
    line-height: inherit;
    text-transform: unset;
    text-rendering: optimizeLegibility;

    &-normal {
      font-size: 1rem;
      font-weight: 400;
      color: $color-text-10;
    }

    &-links {
      font-size: 1rem;
      font-weight: 400;
      color: $color-blue-6;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.form button {
  width: 100%;
  font-size: 16px;
  margin-top: 10px;
}

.form p {
  margin: 1rem 0;
  font-size: 0.7rem;
}

.form .errorMsg {
  color: $color-feedback-error;
  font-size: 13px;
  text-align: left;
  text-wrap: nowrap;
  margin-top: 0.3rem;
  margin-left: 3px;
}

.pointer {
  cursor: pointer;
}

.form.sign-in {
  transform: scale(1);
}

.text {
  margin: 3rem;
  color: #ffffff;
}

.text h1 {
  font-size: 4rem;
  font-weight: 800;
  margin: 2rem 0;
  transition: 0.6s ease-in-out;
}

.text p {
  font-weight: 600;
  transition: 0.6s ease-in-out;
  transition-delay: 0.2s;
}

.text-title {
  font-size: 2rem;
  font-weight: 600;
  color: $color-text-10 !important;
}

.text.sign-in h2,
.text.sign-in img,
.text.sign-in p {
  transform: translateX(-250%);
}

:deep(.custom-input-container) {
  margin: 0;
}
:deep(.custom-input) {
  padding: 10px 13px !important;
}

:deep(.ant-form) {
  .ant-form-item {
    margin: 0;
    margin-bottom: 24px;
  }
}

@include xxs {
  .text-title {
    margin: 0px !important;
    margin-bottom: 20px !important;
  }
}

@include xs {
  .text-title {
    margin: 0px !important;
    margin-bottom: 20px !important;
  }
}
</style>
