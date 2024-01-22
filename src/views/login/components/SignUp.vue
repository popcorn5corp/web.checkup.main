<template>
  <Form :model="formData" :rules="rules" @validate="onValidate" @finish="onFinish">
    <div class="form sign-up">
      <h1 class="text text-title">{{ $t('common.signUpText') }}</h1>

      <template v-if="!signUpComplete">
        <FormItem name="email">
          <Input
            type="email"
            :label="`${$t('common.idText')} (${$t('common.email')})`"
            v-model:value="formData.email"
            :placeholder="$t('common.inputEmail')"
          />
        </FormItem>
        <FormItem name="password">
          <Input
            type="password"
            :label="$t('common.passwordText')"
            v-model:value="formData.password"
          />
        </FormItem>
        <FormItem name="verifyPassword">
          <Input
            type="password"
            :label="$t('common.rePasswordText')"
            v-model:value="formData.verifyPassword"
          />
        </FormItem>
        <FormItem name="name">
          <Input :label="$t('common.name')" v-model:value="formData.name" />
        </FormItem>
        <FormItem name="phone">
          <Input
            :label="$t('common.phone')"
            @change="onInputPhoneNumber"
            v-model:value="formData.phone"
            :maxlength="13"
          />
        </FormItem>
        <div class="terms-wrapper">
          <Checkbox v-model:checked="agreeTerms">
            {{ $t('common.signUpTerms') }}
          </Checkbox>
          <span>
            <a>{{ $t('component.button.viewDetail') }}</a>
          </span>
        </div>
      </template>
      <template v-else-if="signUpComplete && !isLoading">
        <p style="font-size: 15px; margin: 30px 0">
          {{ $t('common.signUpComplete', { name: formData.name }) }}
        </p>
      </template>
      <template v-if="!signUpComplete">
        <FormItem>
          <Button
            :label="$t('common.join')"
            type="primary"
            size="large"
            html-type="submit"
            :loading="isLoading"
            :disabled="!agreeTerms"
          />
        </FormItem>
      </template>
      <template v-else>
        <Button
          @click="props.onToggle()"
          :label="$t('common.loginText')"
          type="primary"
          size="large"
        />
      </template>
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
    </div>
  </Form>
</template>

<script setup lang="ts" name="SignUp">
import { AuthService } from '@/services'
import { Util } from '@/utils'
import { Checkbox, message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Input } from '@/components/input'

interface Props {
  onToggle: () => void
}
const props = withDefaults(defineProps<Props>(), {})
const { t } = useI18n()

const signUpComplete = ref(false)
const agreeTerms = ref(false)
const isLoading = ref(false)

const formData = reactive<Record<string, string>>({
  email: '',
  password: '',
  verifyPassword: '',
  name: '',
  phone: ''
})

const rules: Record<string, Rule[]> = {
  email: [{ required: true, message: 'Please input your ID!', trigger: 'change' }],
  password: [{ required: true, message: 'Please input your password!', trigger: 'change' }],
  verifyPassword: [
    { required: true, message: 'Please input your verify password!', trigger: 'change' }
  ],
  name: [{ required: true, message: 'Please input your name!', trigger: 'change' }],
  phone: [{ required: true, message: 'Please input your phone!', trigger: 'change' }]
}

const onInputPhoneNumber = (e: Event) => {
  const phoneNumber = Util.Data.phoneDash((e.target as HTMLInputElement).value)
  formData.phone = phoneNumber
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
    console.log(data)
    signUpComplete.value = true
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.form {
  padding: 1rem;
  background-color: $color-white;
  border-radius: 1.5rem;
  width: 100%;
  // box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transform: scale(0);
  transition: 0.5s ease-in-out;
  transition-delay: 1s;
}

.container.sign-in .form.sign-in,
.container.sign-up .form.sign-up {
  transform: scale(1);
}

.form button {
  width: 100%;
  font-size: 16px;
}

.form p {
  margin: 1rem 0;
  font-size: 14px;
}

.form-container {
  width: 100%;
}

.text-title {
  font-size: 2rem;
  font-weight: 600;
  color: $color-black !important;
}

.terms-wrapper {
  margin: 1.2rem 0;
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
