<template>
  <div class="find-password-form-container">
    <template v-if="!isSuccessFindPassword">
      <!-- <RadioGroup class="radio-wrapper" v-model:value="authenticationType" size="large">
        <Radio :value="IAuth.authenticationTypes.PHONE">{{ $t('page.login.authPhone') }}</Radio>
        <Radio :value="IAuth.authenticationTypes.EMAIL">
          {{ $t('page.login.authEmail') }}
        </Radio>
      </RadioGroup> -->
      <Form :model="formData" @finish="onFindPassword">
        <FormItem name="userId">
          <CustomInput
            type="email"
            v-model:value="formData.userId"
            placeholder="example@gmail.com"
            :label="$t('common.idText')"
            :isError="errorState.userId"
            @change="onValidateFields($event, 'userId')"
          />
          <div class="errorMsg" v-if="errorState.userId">
            {{ $t('message.validate.checkUserId') }}
          </div>
        </FormItem>
        <FormItem name="userName">
          <CustomInput
            v-model:value="formData.userName"
            :label="$t('common.name')"
            :isError="errorState.userName"
            @change="onValidateFields($event, 'userName')"
          />
          <div class="errorMsg" v-if="errorState.userName">
            {{ $t('message.validate.checkName') }}
          </div>
        </FormItem>
        <div class="certification-wrapper">
          <!-- email로 인증 -->
          <!-- <template v-if="authenticationType === IAuth.authenticationTypes.EMAIL">
            <FormItem name="email">
              <div class="input-wrapper">
                <Input
                  type="email"
                  v-model:value="formData.email"
                  style="width: 100%"
                  placeholder="example@gmail.com"
                  :label="$t('common.email')"
                  :isError="errorState.email"
                  @change="onValidateFields($event, 'email')"
                />
                <Button
                  :label="$t('component.button.sendCertifiNum')"
                  class="certification-btn"
                  :loading="isSendLoading"
                  :disabled="!formData.email"
                  @click="onSendEmail"
                />
              </div>
              <div class="errorMsg" v-if="errorState.email">
                {{ $t('message.validate.checkEmail') }}
              </div>
            </FormItem>
          </template> -->
          <template v-if="authenticationType === IAuth.authenticationTypes.PHONE">
            <!-- phone으로 인증 -->
            <FormItem name="phone">
              <div class="input-wrapper">
                <CustomInput
                  v-model:value="formData.phone"
                  :label="$t('common.phone')"
                  style="width: 100%"
                  :maxlength="13"
                  :isError="errorState.phone"
                  @change="onInputPhoneNumber"
                />
                <Button
                  :label="$t('component.button.sendCertifiNum')"
                  class="certification-btn"
                  :loading="isSendLoading"
                  :disabled="!formData.phone"
                  @click="onSendPhone"
                />
              </div>
              <div class="errorMsg" v-if="errorState.phone">
                {{ $t('message.validate.checkPhone') }}
              </div>
            </FormItem>
          </template>
        </div>
        <FormItem name="certificationNumber">
          <CustomInput
            v-model:value="formData.certificationNumber"
            :label="$t('common.certificationNumber')"
            :isError="errorState.certificationNumber"
            @change="onValidateFields($event, 'certificationNumber')"
          />
          <div class="errorMsg" v-if="errorState.certificationNumber">
            {{ $t('message.validate.checkCertifiNum') }}
          </div>
          <p v-if="validData.validSec" class="timer">
            <small class="text-danger">{{ validData.timeStr }}</small>
          </p>
        </FormItem>
        <FormItem>
          <Button
            :label="$t('component.button.next')"
            html-type="submit"
            type="primary"
            size="large"
            class="next-btn"
            :loading="isLoading"
          />
        </FormItem>
      </Form>
    </template>
    <template v-else>
      <ResetPasswordForm :uid="uid" />
    </template>
  </div>
</template>

<script setup lang="ts" name="FindPasswordForm">
import { AuthService } from '@/services'
import { Util } from '@/utils'
import { Radio, RadioGroup } from 'ant-design-vue'
import { reactive } from 'vue'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { IAuth } from '@/services/auth/types'

import { FormItem } from '@/components/form'
import { CustomInput } from '@/components/input'

import ResetPasswordForm from './ResetPasswordForm.vue'

const { t } = useI18n()

const formData = reactive<Record<string, string>>({
  userId: '',
  userName: '',
  email: '',
  phone: '',
  certificationNumber: ''
})
const errorState = reactive<Record<string, boolean>>({
  userId: false,
  userName: false,
  email: false,
  phone: false,
  certificationNumber: false
})

// 인증 정보 & 타이머
const validData = reactive({
  auth_uuid: '',
  validSec: 0,
  timeStr: '',
  certificationNumber: '',
  isRunning: false,
  timer: ''
})
const isValidSuccess = reactive({
  email: false,
  phone: false
})

const uid = ref('')
const authenticationType = ref<IAuth.AuthenticationType>(IAuth.authenticationTypes.PHONE)
const isLoading = ref(false)
const isSendLoading = ref(false)
const isSuccessFindPassword = ref(false)

const onInputPhoneNumber = (e: Event) => {
  const phoneNumber = Util.Format.phoneDash((e.target as HTMLInputElement).value)
  formData.phone = phoneNumber
  errorState.phone = !phoneNumber
}

const onValidateFields = (e: Event, value: string) => {
  const fieldsValue = (e.target as HTMLInputElement).value
  if (fieldsValue) {
    errorState[value] = !fieldsValue
  } else {
    errorState[value] = true
  }
}

/**
 * @description 폼 벨리데이션 체크
 */
const isFormValid = () => {
  Object.keys(formData).forEach((field) => {
    if (!formData[field]) {
      errorState[field] = true
    }
  })

  const { userId, userName, certificationNumber, phone, email } = errorState

  if (userId || userName || certificationNumber) return false
  if (authenticationType.value === IAuth.authenticationTypes.PHONE) {
    if (phone) return false
    if (!isValidSuccess.phone) return false
  } else {
    if (email) return false
    if (!isValidSuccess.email) return false
  }

  return true
}
const resetFields = () => {
  Object.keys(formData).forEach((field) => {
    errorState[field] = false
    formData[field] = ''
  })
}

/**
 * @description 이메일 인증번호 전송 & 타이머 시작
 */
const onSendEmail = async () => {
  isSendLoading.value = true
  try {
    const reqData = {
      certificationType: IAuth.certificationTypes.EMAIL_AUTH,
      email: formData.email.trim()
    }
    const { data } = await AuthService.sendEmail(reqData)
    validData.validSec = data.validSec
    validData.auth_uuid = data.auth_uuid

    if (validData.isRunning) {
      stopTimer(validData.timer)
    } else {
      startTimer()
    }
    isValidSuccess.email = true
  } catch (err) {
    console.log(err)
  } finally {
    isSendLoading.value = false
  }
}

/**
 * @description 휴대폰 인증번호 전송 & 타이머 시작
 */
const onSendPhone = async () => {
  isSendLoading.value = true

  try {
    const reqData = {
      certificationType: IAuth.certificationTypes.SIGNUP,
      phone: formData.phone.trim()
    }
    const { data } = await AuthService.sendPhone(reqData)
    validData.validSec = data.validSec
    validData.auth_uuid = data.auth_uuid

    if (validData.isRunning) {
      stopTimer(validData.timer)
    } else {
      startTimer()
    }
    isValidSuccess.phone = true
  } catch (err) {
    console.log(err)
  } finally {
    isSendLoading.value = false
  }
}

/**
 * @description 비밀번호 찾기
 */
const onFindPassword = async () => {
  if (!isFormValid()) return

  try {
    isLoading.value = true
    for (let k in formData) {
      formData[k] = formData[k].trim()
    }
    const { userId, userName, email, phone, certificationNumber } = formData

    const validReqData = {
      certificationType: IAuth.certificationTypes.SIGNUP,
      auth_uuid: validData.auth_uuid,
      certificationNumber
    }
    const findReqData = {
      userId,
      authenticationType: IAuth.authenticationTypes.PHONE,
      userName,
      auth_uuid: validData.auth_uuid,
      contact: {}
    }

    if (authenticationType.value === IAuth.authenticationTypes.EMAIL) {
      // 이메일 인증번호 확인
      await handleAuthentication(
        validReqData,
        findReqData,
        IAuth.certificationTypes.EMAIL_AUTH,
        IAuth.authenticationTypes.EMAIL,
        { email: email }
      )
    } else {
      // 휴대폰 인증번호 확인
      await handleAuthentication(
        validReqData,
        findReqData,
        IAuth.certificationTypes.SIGNUP,
        IAuth.authenticationTypes.PHONE,
        { phone: phone }
      )
    }

    const { data } = await AuthService.findPassword(findReqData)
    uid.value = data.uid

    isSuccessFindPassword.value = true
    stopTimer(validData.timer)
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}

const handleAuthentication = async (
  validReqData: any,
  findReqData: any,
  certificationType: IAuth.CertificationType,
  authenticationType: IAuth.AuthenticationType,
  contact: any
) => {
  let data
  if (authenticationType === IAuth.authenticationTypes.EMAIL) {
    data = await AuthService.validEmail({
      ...validReqData,
      certificationType,
      ...contact
    })
  } else {
    data = await AuthService.validPhone({
      ...validReqData,
      certificationType,
      ...contact
    })
  }

  if (!data.success) {
    errorState.certificationNumber = true
    throw new Error(t('message.validate.checkErrorCertifiNum'))
  }

  Object.assign(findReqData, {
    authenticationType,
    contact
  })
}

const stopTimer = (timer: string) => {
  clearInterval(timer)
  validData.validSec = 0
  validData.isRunning = false
}

const startTimer = () => {
  validData.timer = setInterval(() => {
    validData.validSec--
    validData.timeStr = prettyTime()

    if (validData.validSec <= 0) {
      stopTimer(validData.timer)
      // TODO 인증시간 만료 메시지
    }
  }, 1000) as any
  validData.isRunning = true
}

const prettyTime = () => {
  let minutes = parseInt(validData.validSec / 60, 10).toString()
  let seconds = parseInt(validData.validSec % 60, 10).toString()
  minutes = minutes.length < 2 ? '0' + minutes : minutes
  seconds = seconds.length < 2 ? '0' + seconds : seconds
  return minutes + ':' + seconds
}

watch(
  () => authenticationType.value,
  () => {
    resetFields()
  }
)
</script>

<style scoped lang="scss">
.transition-form {
  transition: 0.5s ease-in-out;
}
.certification-wrapper {
  .custom-input-container {
    margin: 0;
  }
  :deep(.custom-input) {
    padding: 10px 13px !important;
  }
  :deep(.ant-form-item-control-input-content) {
    display: flex;
    flex-direction: column;
  }
  .input-wrapper {
    display: flex;
    gap: 8px;
  }
  .certification-btn {
    height: 43px;
    border: 1.5px solid $color-gray-5;
    border-radius: 8px;
    padding: 5px 7px;
  }
}
.radio-wrapper {
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  :deep(.ant-radio-wrapper) {
    span {
      word-break: keep-all;
    }
  }
}

.errorMsg {
  color: $color-feedback-error;
  font-size: 13px;
  text-align: left;
  text-wrap: nowrap;
  margin-top: 0.3rem;
  margin-left: 3px;
}

.timer {
  position: absolute;
  bottom: -22px;
  left: 0;
  color: $color-feedback-error;
  font-size: 13px;
  margin: 0;
}

.next-btn {
  width: 100%;
  margin-top: 10px;
  font-size: 15px;
}

// transition
.find-password-enter-from {
  transform: scale(0);
}
.find-password-enter-to {
  transform: scale(1);
}
.find-password-leave-from {
  transform: scale(1);
}
</style>
