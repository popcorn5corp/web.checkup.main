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

    <div class="text-btn-wrapper">
      <div class="text-btn pointer join" @click="props.onToggle">
        {{ $t('common.signUpText') }}
      </div>
      <div style="display: flex; align-items: center; gap: 5px">
        <div
          class="text-btn pointer"
          @click="
            () => {
              emit('update:isLogin', false)
              findType = 'id'
            }
          "
        >
          {{ $t('common.findId') }}
        </div>
        <div class="dot" />
        <div
          class="text-btn pointer find-password"
          @click="
            () => {
              emit('update:isLogin', false)
              findType = 'password'
            }
          "
        >
          {{ $t('common.findPassword') }}
        </div>
      </div>
    </div>

    <div class="striped">
      <span class="striped-line"></span>
      <span class="striped-text">OR</span>
      <span class="striped-line"></span>
    </div>

    <SocialLoginBnts />
  </div>
</template>

<script setup lang="ts" name="SignIn">
import { AuthService } from '@/services'
import { useAuthStore } from '@/stores'
import { reactive, ref } from 'vue'
import type { IAuth } from '@/services/auth/interface'
import { Input } from '@/components/input'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/cacheKeyEnum'
import SocialLoginBnts from './SocialLoginBnts.vue'

interface Props {
  onToggle: () => void
  // updateSuccessLogin?: () => void
  isSuccessLogin?: boolean
  isLogin?: boolean
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['update:isSuccessLogin', 'update:isLogin'])

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
const findType = ref()

const onValidateFields = (e: Event, value: string) => {
  const fieldsValue = (e.target as HTMLInputElement).value
  console.log(fieldsValue)
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

  .striped {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;

    &-line {
      flex: auto;
      flex-basis: auto;
      border: none;
      outline: none;
      height: 2px;
      background: $color-grayish;
    }

    &-text {
      font-family: inherit;
      font-size: 1rem;
      font-weight: 500;
      line-height: inherit;
      color: $color-black;
      margin: 0 1rem;
    }
  }
}

.form button {
  width: 100%;
  font-size: 16px;
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

.text-btn-wrapper {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin: 1.5rem 0;

  .text-btn {
    padding: 2px;
    color: $color-primary;
    font-weight: 600;
  }
  .join {
    color: $color-gray-6;
  }
  .dot {
    width: 5px;
    height: 5px;
    background: $color-gray-5;
    border-radius: 50%;
  }
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
</style>
