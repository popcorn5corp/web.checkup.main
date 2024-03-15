<template>
  <div class="sign-up-container">
    <Form :model="formData" @validate="onFormValid" @finish="onSubmit">
      <template v-if="!signUpComplete">
        <h1 class="text text-title">{{ $t('component.button.signUpText') }}</h1>
        <FormItem
          name="userId"
          :rules="[
            {
              required: true,
              pattern: ValidateUtil.isId() as RegExp,
              message: `${$t('message.validate.checkUserIdFormat')}`
            }
          ]"
        >
          <Input
            v-model:value="formData.userId"
            :label="$t('common.idText')"
            :isError="errorState.userId"
          />
        </FormItem>

        <FormItem
          name="password"
          :rules="[
            {
              required: true,
              pattern: ValidateUtil.isPassword() as RegExp,
              message: `${$t('message.validate.checkPasswordFormat')}`
            }
          ]"
        >
          <Input
            type="password"
            v-model:value="formData.password"
            :isError="errorState.password"
            :label="$t('common.passwordText')"
          />
        </FormItem>

        <FormItem
          name="passwordVerify"
          :rules="[
            {
              required: true,
              message: `${$t('message.validate.checkVerifyPassword')}`,
              whitespace: true,
              validator: onValidVerifyPassword
            }
          ]"
        >
          <Input
            type="password"
            v-model:value="formData.passwordVerify"
            :label="$t('common.rePasswordText')"
            :isError="errorState.passwordVerify"
          />
        </FormItem>

        <div class="terms-wrapper">
          <FormItem
            name="terms"
            :rules="[
              {
                required: true,
                type: 'array',
                min: 2,
                message: `${$t('message.validate.checkTerms')}`
              }
            ]"
          >
            <CheckboxGroup v-model:value="formData.terms">
              <Checkbox value="serviceTerms">
                {{ $t('page.login.serviceTerms') }}
              </Checkbox>
              <span>
                <a>{{ $t('component.button.viewDetail') }}</a>
              </span>
              <Checkbox value="privacyTerms">
                {{ $t('page.login.privacyTerms') }}
              </Checkbox>
              <span>
                <a>{{ $t('component.button.viewDetail') }}</a>
              </span>
            </CheckboxGroup>
          </FormItem>
        </div>

        <FormItem>
          <Button
            type="primary"
            size="large"
            html-type="submit"
            :label="$t('component.button.join')"
            :loading="isLoading"
          />
        </FormItem>

        <p>
          <span>
            {{ $t('page.login.signUpDesc') }}
          </span>
          <span>
            <b>
              <a @click="props.onToggle">
                {{ $t('common.backToLogin') }}
              </a>
            </b>
          </span>
        </p>
      </template>
      <template v-else-if="signUpComplete && !isLoading">
        <p class="complete-msg">
          🎉 {{ $t('page.login.signUpComplete', { name: formData.name }) }} 🎉
        </p>
        <Button size="large" :label="$t('common.backToLogin')" @click="props.onToggle()">
          <template #icon><LeftOutlined /></template>
        </Button>
      </template>
    </Form>
  </div>
</template>

<script setup lang="ts" name="SignUp">
import { AuthService } from '@/services'
import { Checkbox, CheckboxGroup } from 'ant-design-vue'
import { error } from 'console'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ValidateUtil } from '@/utils/validateUtil'
import { Form } from '@/components/form'
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
const isLoading = ref(false)

const errorState = reactive<Record<string, boolean>>({
  userId: false,
  password: false,
  passwordVerify: false,
  terms: false
})

const formData = reactive<{ [index: string]: any }>({
  userId: '',
  password: '',
  passwordVerify: '',
  terms: []
})

const onFormValid = (name: string | number | string[] | number[], status: boolean) => {
  console.log(name, status)
  errorState[name as string] = !status
}

/**
 * @description 아이디 형식 검사
 */
const onValidId = () => {
  errorState.userIdFormat = !ValidateUtil.isId(formData.userId)
}

/**
 * @description 비밀번호 형식 검사
 */
const onValidPassword = () => {
  errorState.passwordFormat = !ValidateUtil.isPassword(formData.password)
}

/**
 * @description 비밀번호 확인 형식 검사
 */
const onValidVerifyPassword = () => {
  errorState.passwordVerify = formData.password !== formData.passwordVerify

  return errorState.passwordVerify
    ? Promise.reject(t('message.validate.checkVerifyPassword'))
    : Promise.resolve()
}

const onSubmit = async () => {
  try {
    isLoading.value = true

    const { userId, password, passwordVerify } = formData

    const payload = {
      userId,
      password,
      passwordVerify
    }

    const { success, data } = await AuthService.signUp(payload)

    if (!success) {
      throw new Error()
    }
    signUpComplete.value = true

    emit('updateTitleMsg', '환영합니다!')
  } catch (err) {
    /**
     * @description show modal
     */
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
  color: $color-feedback-error;
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
  color: $color-text-10 !important;
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

.form-item-wrapper {
  margin-bottom: 2rem;
  text-align: left;
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
