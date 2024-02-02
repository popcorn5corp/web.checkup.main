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
            :placeholder="$t('message.validate.checkEmail')"
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
            {{ $t('message.validate.checkPassword') }}
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
            {{ $t('message.validate.checkVerifyPassword') }}
          </div>
        </FormItem>
        <FormItem name="name">
          <Input
            :label="$t('common.name')"
            v-model:value="formData.name"
            :isError="errorState.name"
            @change="onValidateFields($event, 'name')"
          />
          <div class="errorMsg" v-if="errorState.name">{{ $t('message.validate.checkName') }}</div>
        </FormItem>
        <FormItem name="phone">
          <Input
            v-model:value="formData.phone"
            :label="$t('common.phone')"
            :maxlength="13"
            :isError="errorState.phone"
            @change="onInputPhoneNumber"
          />
          <div class="errorMsg" v-if="errorState.phone">
            {{ $t('message.validate.checkPhone') }}
          </div>
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
              {{ $t('message.validate.checkTerms') }}
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
        <Button size="large" label="로그인으로 돌아가기" @click="props.onToggle()">
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

  if (value === 'email') {
    errorState.email = !Util.Validate.isEmail(fieldsValue)
    emailErrorMsg.value = t('message.validate.checkEmail')
  } else if (value === 'password') {
    errorState.password = fieldsValue.length < 8
  } else if (value === 'verifyPassword') {
    errorState.verifyPassword = formData.password !== fieldsValue
  } else {
    errorState[value] = !fieldsValue
  }

  if (!fieldsValue) {
    errorState[value] = true
  }
}

const onInputPhoneNumber = (e: Event) => {
  const phoneNumber = Util.Format.phoneDash((e.target as HTMLInputElement).value)
  formData.phone = phoneNumber
  errorState.phone = !phoneNumber
}

const isFormValid = () => {
  Object.keys(formData).forEach((field) => {
    if (!formData[field]) {
      errorState[field] = true
    }
  })
  if (!agreeTerms.value) errorState.check = true

  const { email, password, verifyPassword, name, phone, check } = errorState
  if (email || password || verifyPassword || name || phone || check) {
    return false
  }
  return true
}

const onFinish = async () => {
  if (!isFormValid()) return

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
  margin-top: 10px;
}

.form p {
  margin: 1rem 0;
  font-size: 14px;
}

.form .errorMsg {
  color: $color-danger;
  font-size: 13px;
  text-align: left;
  text-wrap: nowrap;
  margin-top: 0.3rem;
  margin-left: 3px;
}

.terms-wrapper .errorMsg {
  text-align: center;
  margin-top: 0;
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
  .text-title {
    margin: 0px !important;
    margin-bottom: 20px !important;
  }
}
@include xs {
  .text {
    margin: 30px;
  }
  .text-title {
    margin: 0px !important;
    margin-bottom: 20px !important;
  }
}
</style>
