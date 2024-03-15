<template>
  <div class="find-id-form-container">
    <template v-if="!isSuccessFindId">
      <Form :model="formData" @finish="onSubmit">
        <FormItem name="userName">
          <Input
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
          <FormItem name="phone">
            <div class="input-wrapper">
              <Input
                v-model:value="formData.phone"
                :label="$t('common.phone')"
                style="width: 100%"
                :maxlength="13"
                :isError="errorState.phone || errorState.phoneFormat"
                @change="onInputPhoneNumber"
                @blur="onValidPhone"
              />

              <Button
                class="certification-btn"
                :label="
                  errorState.clickCertificationBtn
                    ? $t('component.button.sendCertifiNum')
                    : $t('component.button.reCertifiNum')
                "
                :loading="isSendLoading"
                :disabled="!formData.phone"
                @click="onSendCertification"
              />
            </div>
            <div class="errorMsg" v-if="phoneValidErrMsg">
              {{ phoneValidErrMsg }}
            </div>
          </FormItem>
        </div>
        <FormItem name="certificationNumber">
          <Input
            v-model:value="formData.certificationNumber"
            :label="$t('common.certificationNumber')"
            :disabled="errorState.clickCertificationBtn"
            :isError="!!certificationValidErrMsg"
            @change="onValidEmptyField($event, 'certificationNumber')"
          />
          <div class="errorMsg" v-if="certificationValidErrMsg">
            {{ certificationValidErrMsg }}
          </div>

          <p v-if="timer" class="timer">
            <small>유효시간 {{ renderTimer }}</small>
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
      <div class="success-wrapper">
        <p>{{ $t('page.login.certifiSuccessText') }}</p>
        <div class="id-wrapper">
          <template v-if="findIds.length">
            <div style="margin: 9px 0" v-for="{ provider, userId } in findIds" :key="userId">
              <img v-if="provider" class="social-img" :src="renderLogo(provider)" />{{ userId }}
            </div>
          </template>
          <template v-else>{{ $t('page.login.certifiFailText') }}</template>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts" name="FindIdForm">
import { AuthService } from '@/services'
import { Util } from '@/utils'
import { Radio, RadioGroup } from 'ant-design-vue'
import { computed, reactive } from 'vue'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { IAuth } from '@/services/auth/types'
import { ValidateUtil } from '@/utils/validateUtil'
import { FormItem } from '@/components/form'
import { Input } from '@/components/input'

const { t } = useI18n()

const formData = reactive<Record<string, string>>({
  auth_uuid: '',
  userName: '',
  phone: '',
  certificationNumber: ''
})
const errorState = reactive<Record<string, boolean>>({
  userName: false,
  email: false,
  phone: false,
  phoneFormat: false,
  certificationNumber: false,
  clickCertificationBtn: true
})

const timer = ref<boolean | number>(false)
const validSec = ref(0)

const isSuccessCertification = ref(false)
const findIds = ref()

const isLoading = ref(false)
const isSendLoading = ref(false)
const isSuccessFindId = ref(false)

let serverErrMsgStorage = ref<renderErrMsg>(false)
type renderErrMsg = boolean | string

const renderLogo = (provider: string) => {
  if (provider.includes('KAKAO')) {
    return '/src/assets/svgs/kakaotalk.svg'
  } else if (provider.includes('naver')) {
    return '/src/assets/images/btnG_icon_square.png'
  } else if (provider.includes('GOOGLE')) {
    return '/src/assets/svgs/google_g_logo.svg.webp'
  }
}

const onInputPhoneNumber = (e: Event) => {
  const phoneNumber = Util.Format.phoneDash((e.target as HTMLInputElement).value)
  formData.phone = phoneNumber
  errorState.phone = !phoneNumber
}

/**
 * @description 핸드폰 형식 검사
 */
const onValidPhone = () => {
  errorState.phoneFormat = !ValidateUtil.isPhone(formData.phone)
}

/**
 * @description 필드 공백 체크
 */
const onValidEmptyField = (e: Event, value: string) => {
  const fieldsValue = (e.target as HTMLInputElement).value
  if (fieldsValue) {
    errorState[value] = !fieldsValue
  } else {
    errorState[value] = true
  }
}

/**
 * @description 핸드폰 유효성 텍스트 렌더링
 */
const phoneValidErrMsg = computed<renderErrMsg>(() => {
  const { phone, phoneFormat } = errorState

  const isError = phone || phoneFormat
  const message = phone ? t('message.validate.checkPhone') : t('message.validate.checkPhoneFormat')

  return isError ? message : false
})

/**
 * @description 인증번호 유효성 텍스트 렌더링
 */
const certificationValidErrMsg = computed<renderErrMsg>(() => {
  const isError = errorState.certificationNumber || serverErrMsgStorage.value

  const message = serverErrMsgStorage.value
    ? serverErrMsgStorage.value
    : t('message.validate.checkCertifiNum')

  return isError ? message : false
})

const onValidateFields = (e: Event, value: string) => {
  const fieldsValue = (e.target as HTMLInputElement).value
  if (fieldsValue) {
    errorState[value] = !fieldsValue
  } else {
    errorState[value] = true
  }
}

/**
 * @description 필드 유효성 체크
 */
const isFormValid = () => {
  Object.keys(formData).forEach((field) => {
    if (!formData[field]) {
      errorState[field] = true
    }
  })

  const { userName, certificationNumber, clickCertificationBtn, phone } = errorState

  if (phone || clickCertificationBtn || userName || certificationNumber) return false

  return true
}

/**
 * @description 휴대폰 인증번호 전송 & 타이머 시작
 */
const onSendCertification = async () => {
  if (errorState.phoneFormat) return

  try {
    isSendLoading.value = true

    const payload: IAuth.SendPhoneParam = {
      certificationType: IAuth.certificationTypes.SIGNUP,
      phone: formData.phone.trim()
    }

    const { success, data } = await AuthService.sendCertificationNumber(payload)

    if (!success) {
      throw new Error()
    }

    validSec.value = data.validSec
    formData.auth_uuid = data.auth_uuid

    startTimer()
  } catch (error) {
    /**
     * @TODO show modal
     */
    console.log(error)
    stopTimer()
  } finally {
    isSendLoading.value = false
  }
}

/**
 * @description 아이디 찾기
 */
const onSubmit = async () => {
  if (!isFormValid()) return

  try {
    isLoading.value = true
    if (!isSuccessCertification.value) {
      const { success } = await checkValidCertification()

      if (!success) {
        throw new Error()
      }

      stopTimer()
    }

    const { auth_uuid, userName, phone } = formData
    const payload: IAuth.FindType = {
      auth_uuid,
      authenticationType: IAuth.authenticationTypes.PHONE,
      userName,
      contact: { phone }
    }

    const {
      success,
      data: { userInfo }
    } = await AuthService.findId(payload)

    if (!success) {
      return new Error()
    }

    findIds.value = userInfo

    isSuccessFindId.value = true
    stopTimer()
  } catch (err) {
    /**
     * @TODO show modal
     */
    console.log(err)
  } finally {
    isLoading.value = false
  }
}
/**
 * @description 전송된 인증번호값과 입력된 인증번호 동일한지 체크
 */
const checkValidCertification = (): Promise<{ success: boolean; message: string }> => {
  return new Promise(async (resolve, reject) => {
    try {
      for (let k in formData) {
        formData[k] = formData[k].trim()
      }

      const { phone, auth_uuid, certificationNumber } = formData

      const payload: IAuth.ValidPhoneParam = {
        auth_uuid,
        certificationNumber,
        certificationType: IAuth.certificationTypes.SIGNUP,
        phone
      }

      const { success, data } = await AuthService.validPhone(payload)

      if (!success) {
        throw new Error()
      }

      isSuccessCertification.value = true
      resolve({
        success,
        message: data.message
      })
    } catch (error) {
      errorState.certificationNumber = true
      serverErrMsgStorage.value = error.message

      reject({
        success: false,
        message: error.message
      })
    }
  })
}
const initCertificationInfo = () => {
  formData.certificationNumber = ''
  isSuccessCertification.value = false
  errorState.clickCertificationBtn = false
}

const startTimer = () => {
  initCertificationInfo()

  if (timer.value) stopTimer()

  timer.value = setInterval(() => {
    validSec.value--

    if (validSec.value <= 0) {
      stopTimer()
      validSec.value = 0
    }
  }, 1000) as any
}

const stopTimer = () => {
  clearInterval(timer.value as number)

  timer.value = false
  serverErrMsgStorage.value = ''
}

const renderTimer = computed(() => {
  const minutes = parseInt(validSec.value / 60, 10)
    .toString()
    .padStart(2, '0')
  const seconds = parseInt(validSec.value % 60, 10)
    .toString()
    .padStart(2, '0')

  return minutes + ':' + seconds
})
</script>

<style scoped lang="scss">
.certification-wrapper {
  .custom-input-container {
    margin: 0;
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
  color: $color-feedback-info;
  font-size: 13px;
  margin: 0;
}

.next-btn {
  width: 100%;
  margin-top: 10px;
  font-size: 15px;
}

.success-wrapper {
  p {
    font-size: 15px;
    margin: 1rem 0;
  }
  .id-wrapper {
    font-size: 15px;
    margin: 30px 0;
    border: 1px solid $color-gray-5;
    border-radius: 8px;
    padding: 8px;

    height: 200px;
    overflow-y: scroll;
  }
}

.social-img {
  width: 17px;
  margin-right: 8px;
}
</style>
