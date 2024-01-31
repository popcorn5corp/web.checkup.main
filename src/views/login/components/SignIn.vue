<template>
  <div class="sign-in-container">
    <h1 class="text text-title">{{ $t('common.loginText') }}</h1>
    <Form :model="formData" @finish="onFinish">
      <FormItem name="userId">
        <Input
          id="loginEmail"
          type="email"
          v-model:value="formData.userId"
          :placeholder="$t('component.ph.inputId')"
          :label="$t('common.idText')"
          :isError="errorState.userId"
          @change="onValidateFields($event, 'userId')"
        />
        <div class="errorMsg" v-if="errorState.userId">
          {{ $t('component.ph.inputEmail') }}
        </div>
      </FormItem>
      <FormItem name="password">
        <Input
          id="loginPassword"
          type="password"
          v-model:value="formData.password"
          :placeholder="$t('component.ph.inputPassword')"
          :label="$t('common.passwordText')"
          :isError="errorState.password"
          @change="onValidateFields($event, 'password')"
        />
        <div class="errorMsg" v-if="errorState.password">
          {{ $t('common.message.checkPassword') }}
        </div>
      </FormItem>
      <FormItem>
        <Button
          :label="$t('common.loginText')"
          type="primary"
          size="large"
          html-type="submit"
          :loading="isLoading"
        />
      </FormItem>
    </Form>
  </div>
</template>

<script setup lang="ts" name="SignIn">
import { AuthService } from '@/services'
import { useAuthStore } from '@/stores'
import { reactive, ref } from 'vue'
import type { IAuth } from '@/services/auth/interface'
import { Input } from '@/components/input'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/cacheKeyEnum'

interface Props {
  onToggle: () => void
  isSuccessLogin?: boolean
}
withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['update:isSuccessLogin'])

const { setToken, setRefreshToken, login } = useAuthStore()

const formData = reactive<IAuth.SignInParam>({
  userId: '',
  password: ''
})
const errorState = reactive<Record<string, boolean>>({
  userId: false,
  password: false
})
const isLoading = ref(false)

const onValidateFields = (e: Event, value: string) => {
  const fieldsValue = (e.target as HTMLInputElement).value
  if (fieldsValue) {
    errorState[value] = !fieldsValue
  } else {
    errorState[value] = true
  }
}

const onFinish = async () => {
  ;(Object.keys(formData) as Array<keyof typeof formData>).forEach((field) => {
    if (!formData[field]) {
      errorState[field] = true
    }
  })
  if (!formData.userId || !formData.password) {
    return
  }

  try {
    isLoading.value = true
    const { data, success } = await AuthService.signIn(formData)
    if (success) {
      setToken(ACCESS_TOKEN_KEY, data.accessToken)
      setRefreshToken(REFRESH_TOKEN_KEY, data.refreshToken)
      emit('update:isSuccessLogin', true)

      await login()
    }
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
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
      color: $color-black;
    }

    &-links {
      font-size: 1rem;
      font-weight: 400;
      color: $color-primary;

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
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translate(-50%);
  color: #ff4d4f;
  font-size: 13px;
  text-wrap: nowrap;
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
  color: $color-black !important;
}

.text.sign-in h2,
.text.sign-in img,
.text.sign-in p {
  transform: translateX(-250%);
}

:deep(.custom-input-container) {
  margin: 0;
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
