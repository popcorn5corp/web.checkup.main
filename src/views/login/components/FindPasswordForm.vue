<template>
  <div class="find-password-form-container">
    <template v-if="!isSuccessFindPassword">
      <RadioGroup style="margin: 1rem" v-model:value="authenticationType" size="large">
        <Radio value="phone">휴대폰 번호로 인증</Radio>
        <Radio value="email">e-mail로 인증</Radio>
      </RadioGroup>
      <Form :model="formData" @finish="onFindPassword">
        <FormItem name="userId">
          <Input
            type="email"
            v-model:value="formData.userId"
            placeholder="아이디를 입력해주세요."
            label="아이디"
            :isError="errorState.userId"
            @change="onValidateFields($event, 'userId')"
          />
          <div class="errorMsg" v-if="errorState.userId">아이디를 입력해주세요</div>
        </FormItem>
        <FormItem name="userName">
          <Input
            v-model:value="formData.userName"
            placeholder="이름을 입력해주세요."
            label="이름"
            :isError="errorState.userName"
            @change="onValidateFields($event, 'userName')"
          />
          <div class="errorMsg" v-if="errorState.userName">이름을 입력해주세요</div>
        </FormItem>
        <div class="certification-wrapper">
          <template v-if="authenticationType === 'email'">
            <!-- email로 인증 -->
            <FormItem name="email">
              <Input
                type="email"
                v-model:value="formData.email"
                placeholder="이메일을 입력해주세요."
                label="이메일"
                style="width: 100%"
                :isError="errorState.email"
                @change="onValidateFields($event, 'email')"
              />
              <div class="errorMsg" v-if="errorState.email">이메일을 입력해주세요</div>
              <Button
                label="인증번호 전송"
                class="certification-btn"
                :loading="isSendLoading"
                :disabled="validData.isRunning || !formData.email"
                @click="onSendEmail"
              />
            </FormItem>
          </template>
          <template v-else>
            <!-- phone으로 인증 -->
            <FormItem name="phone">
              <Input
                v-model:value="formData.phone"
                placeholder="휴대폰 번호를 입력해주세요."
                label="휴대폰"
                style="width: 100%"
                :maxlength="13"
                :isError="errorState.phone"
                @change="onInputPhoneNumber"
              />
              <div class="errorMsg" v-if="errorState.phone">휴대폰 번호를 입력해주세요</div>
              <Button
                label="인증번호 전송"
                class="certification-btn"
                :loading="isSendLoading"
                :disabled="validData.isRunning || !formData.phone"
                @click="onSendPhone"
              />
            </FormItem>
          </template>
        </div>
        <FormItem name="certificationNumber">
          <Input
            v-model:value="formData.certificationNumber"
            placeholder="인증번호를 입력해주세요."
            label="인증번호"
            :isError="errorState.certificationNumber"
            @change="onValidateFields($event, 'certificationNumber')"
          />
          <div class="errorMsg" v-if="errorState.certificationNumber">인증번호를 입력해주세요</div>
          <p v-if="validData.validSec" class="timer">
            <small class="text-danger">{{ validData.timeStr }}</small>
          </p>
        </FormItem>
        <FormItem>
          <Button
            label="다음"
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
import { FormItem } from '@/components/form'
import { Input } from '@/components/input'
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
const authenticationType = ref('phone')
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
const checkValidation = () => {
  Object.keys(formData).forEach((field) => {
    if (!formData[field]) {
      errorState[field] = true
    }
  })

  if (errorState.userId || errorState.userName || errorState.certificationNumber) return false
  if (authenticationType.value === 'phone') {
    if (errorState.phone) return false
    if (!isValidSuccess.phone) return false
  } else {
    if (errorState.email) return false
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
      certificationType: 'EMAIL_AUTH',
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
      certificationType: 'SIGNUP',
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
  if (!checkValidation()) return

  try {
    isLoading.value = true
    for (let k in formData) {
      formData[k] = formData[k].trim()
    }
    const { userId, userName, email, phone, certificationNumber } = formData

    const validReqData = {
      certificationType: '',
      auth_uuid: validData.auth_uuid,
      certificationNumber
    }
    const findReqData = {
      userId,
      authenticationType: '',
      userName,
      auth_uuid: validData.auth_uuid,
      contact: {}
    }

    if (authenticationType.value === 'email') {
      // 이메일 인증번호 확인
      await handleAuthentication(validReqData, findReqData, 'EMAIL_AUTH', 'EMAIL', { email: email })
    } else {
      // 휴대폰 인증번호 확인
      await handleAuthentication(validReqData, findReqData, 'SIGNUP', 'PHONE', { phone: phone })
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
  certificationType: string,
  authenticationType: string,
  contact: any
) => {
  let data
  if (authenticationType === 'EMAIL') {
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
    throw new Error('인증번호가 유효하지 않습니다.')
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

.errorMsg {
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translate(-50%);
  color: #ff4d4f;
  font-size: 13px;
  text-wrap: nowrap;
}

.timer {
  position: absolute;
  bottom: -22px;
  left: 0;
  color: #ff4d4f;
  font-size: 13px;
  margin: 0;
}

.next-btn {
  width: 100%;
  margin-top: 10px;
  font-size: 15px;
}
</style>
