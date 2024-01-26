<template>
  <div class="sign-up-container">
    <Form :model="formData" @finish="onFinish">
      <template v-if="!signUpComplete">
        <h1 class="text text-title">{{ $t('common.signUpText') }}</h1>
        <FormItem name="email">
          <Input
            type="email"
            v-model:value="formData.email"
            :label="`${$t('common.idText')} (${$t('common.email')})`"
            :placeholder="$t('common.inputEmail')"
            :isError="errorState.email"
            @change="onValidateFields($event, 'email')"
          />
          <div class="errorMsg" v-if="errorState.email">{{ emailErrorMsg }}</div>
        </FormItem>
        <FormItem name="password">
          <Input
            type="password"
            v-model:value="formData.password"
            :isError="errorState.password"
            :label="$t('common.passwordText')"
            :min="8"
            @change="onValidateFields($event, 'password')"
          />
          <div class="errorMsg" v-if="errorState.password">
            {{ $t('common.message.checkPassword') }}
          </div>
        </FormItem>
        <FormItem name="verifyPassword">
          <Input
            type="password"
            v-model:value="formData.verifyPassword"
            :label="$t('common.rePasswordText')"
            :isError="errorState.verifyPassword"
            @change="onValidateFields($event, 'verifyPassword')"
          />
          <div class="errorMsg" v-if="errorState.verifyPassword">
            {{ $t('common.message.checkVerifyPassword') }}
          </div>
        </FormItem>
        <FormItem name="name">
          <Input
            :label="$t('common.name')"
            v-model:value="formData.name"
            :isError="errorState.name"
            @change="onValidateFields($event, 'name')"
          />
          <div class="errorMsg" v-if="errorState.name">{{ $t('common.inputName') }}</div>
        </FormItem>
        <FormItem name="phone">
          <Input
            v-model:value="formData.phone"
            :label="$t('common.phone')"
            :maxlength="13"
            :isError="errorState.phone"
            @change="onInputPhoneNumber"
          />
          <div class="errorMsg" v-if="errorState.phone">{{ $t('common.message.inputPhone') }}</div>
        </FormItem>
        <div class="terms-wrapper">
          <FormItem>
            <Checkbox
              v-model:checked="agreeTerms"
              @change="
                (value) => {
                  errorState.check = !value
                }
              "
            >
              {{ $t('common.signUpTerms') }}
            </Checkbox>
            <span>
              <a>{{ $t('component.button.viewDetail') }}</a>
            </span>
            <div class="errorMsg" v-if="errorState.check">
              {{ $t('common.message.checkTerms') }}
            </div>
          </FormItem>
        </div>
        <FormItem>
          <Button
            type="primary"
            size="large"
            html-type="submit"
            :label="$t('common.join')"
            :loading="isLoading"
          />
        </FormItem>
        <p>
          <span>
            {{ $t('common.signUpDesc') }}
          </span>
          <span>
            <b>
              <a @click="props.onToggle">
                {{ ' ' + $t('common.backToLogin') }}
              </a>
            </b>
          </span>
        </p>
      </template>
      <template v-else-if="signUpComplete && !isLoading">
        <p class="complete-msg">🎉 {{ $t('common.signUpComplete', { name: formData.name }) }} 🎉</p>
        <Button size="large" label="로그인하러가기" @click="props.onToggle()">
          <template #icon><LeftOutlined /></template>
        </Button>
      </template>
    </Form>
  </div>
</template>

<script setup lang="ts" name="SignUp">
import { AuthService } from '@/services'
import { Util } from '@/utils'
import { Checkbox } from 'ant-design-vue'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { LeftOutlined } from '@/components/icons'
import { Input } from '@/components/input'

interface Props {
  onToggle: () => void
  updateTitleMsg?: () => void
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['updateTitleMsg'])
const { t } = useI18n()

const signUpComplete = ref(false)
const agreeTerms = ref(false)
const isLoading = ref(false)

const emailErrorMsg = ref(t('component.ph.inputEmail'))
const errorState = reactive<Record<string, boolean>>({
  email: false,
  password: false,
  verifyPassword: false,
  name: false,
  phone: false,
  check: false
})

const formData = reactive<Record<string, string>>({
  email: '',
  password: '',
  verifyPassword: '',
  name: '',
  phone: ''
})

const onValidateFields = (e: Event, value: string) => {
  const fieldsValue = (e.target as HTMLInputElement).value

  if (fieldsValue) {
    if (value === 'email') {
      errorState.email = !Util.Data.isEmail(fieldsValue)
      emailErrorMsg.value = t('common.inputEmail')
    } else if (value === 'password') {
      errorState.password = fieldsValue.length < 8
    } else if (value === 'verifyPassword') {
      errorState.verifyPassword = formData.password !== fieldsValue
    } else {
      errorState[value] = !fieldsValue
    }
  } else {
    errorState[value] = true
  }
}

const onInputPhoneNumber = (e: Event) => {
  const phoneNumber = Util.Data.phoneDash((e.target as HTMLInputElement).value)
  formData.phone = phoneNumber
  errorState.phone = !phoneNumber
}

const checkValidation = () => {
  Object.keys(formData).forEach((field) => {
    if (!formData[field]) {
      errorState[field] = true
    }
  })
  if (!agreeTerms.value) errorState.check = true
}

const onFinish = async () => {
  checkValidation()
  if (
    errorState.email ||
    errorState.password ||
    errorState.verifyPassword ||
    errorState.name ||
    errorState.phone ||
    errorState.check
  )
    return

  try {
    isLoading.value = true
    for (let k in formData) {
      formData[k] = formData[k].trim()
    }
    const { email, password, name, phone } = formData
    const { data } = await AuthService.signUp({
      userId: email,
      email,
      password,
      name,
      phone
    })
    console.log('sign up complete', data)
    emit('updateTitleMsg', '환영합니다!')
    signUpComplete.value = true
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.form button {
  width: 100%;
  font-size: 16px;
}

.form p {
  margin: 1rem 0;
  font-size: 14px;
}

.form .errorMsg {
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translate(-50%);
  color: #ff4d4f;
  font-size: 13px;
}

.form-container {
  width: 100%;
}

.text-title {
  font-size: 2rem;
  font-weight: 600;
  color: $color-black !important;
}

.text {
  margin: 3rem;
  color: #ffffff;
}
.text h1 {
  font-size: 4rem;
  font-weight: 800;
  margin: 2rem 0;
  transition: 1s ease-in-out;
}

.text p {
  font-weight: 600;
  transition: 1s ease-in-out;
  transition-delay: 0.2s;
}

.complete-msg {
  font-size: 24px !important;
  margin: 40px 0px !important;
}

.pointer {
  cursor: pointer;
}

/* RESPONSIVE */
@include xxs {
  .text {
    margin: 30px;
  }
}
@include xs {
  .text {
    margin: 30px;
  }
}
</style>
