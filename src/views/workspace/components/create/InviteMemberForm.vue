<template>
  <div class="invite-member-form-container">
    <div class="text-wrapper" v-if="props.isShowDescription">
      <h1>{{ $t('page.workspace.createStep3Tit') }}</h1>
      <p>{{ $t('page.workspace.createStep3Desc') }}</p>
    </div>
    <div class="form-wrapper">
      <div class="label email-input">
        <span>
          {{ $t('page.workspace.createStep3Info') }}
        </span>
        <span class="error-msg" v-if="!isEmailValid">{{ emailValidText }}</span>
      </div>

      <div :class="['select-wrapper', !isEmailValid ? 'error' : '']" @click="inputRef.focus()">
        <div class="input-wrapper">
          <div class="input-box">
            <Input
              ref="inputRef"
              class="input"
              :placeholder="$t('message.validate.checkEmail')"
              v-model:value="emailValue"
              @pressEnter="onInputEnter"
              @focusout="onInputEnter"
              @change="onChangeEmail"
            />
          </div>
        </div>
        <div class="tags-wrapper">
          <template v-for="tag in inviteEmails" :key="tag">
            <div class="tag">
              <span class="text">{{ tag }}</span>
              <span class="icon" @click="onRemove(tag)">
                <CloseOutlined />
              </span>
            </div>
          </template>
        </div>
      </div>

      <div>
        <div class="label auth-select">
          {{ $t('page.workspace.createStep4Info') }}
          <span style="">({{ $t('common.essential') }})</span>
        </div>

        <Select
          v-model:value="selectedAuth"
          :options="authList.map((auth) => ({ label: auth.name, value: auth.authId }))"
          :placeholder="$t('component.ph.selectAuth')"
          style="width: 250px"
          @change="onChangeSelectedAuth"
          allowClear
        />
      </div>

      <div class="jump-wrapper" v-if="isShowJump">
        <span class="jump" @click="onSkip">{{ $t('page.workspace.inviteStepJump') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="InviteMemberForm">
import { ManageUserService } from '@/services'
import { Util } from '@/utils'
import { Input, Select } from 'ant-design-vue'
import { computed, ref, toRefs, unref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useWorkspaceStore } from '@/stores/modules/workspace'

import { CloseOutlined } from '@/components/icons'
import { WorkspaceService } from '@/services'
import type { IWorkspace } from '@/services/workspace/types'
import type { ChangeEventHandler } from 'ant-design-vue/es/_util/EventInterface'
import type { KeyboardEventHandler } from 'ant-design-vue/lib/_util/EventInterface'
import { useMessage } from '@/hooks/useMessage'

interface Props {
  isShowDescription?: boolean
  isShowJump?: boolean
  isFetch?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isShowDescription: true,
  isShowJump: true,
  isFetch: false
})

const { t } = useI18n()
const { createMessage: message } = useMessage()
const workspaceStore = useWorkspaceStore()
const {
  moveNextStep,
  initFormValueInviteEmails,
  pushFormValueInviteEmails,
  removeFormValueInviteEmails,
  setNextBtnDisabled,
  setFormValues
} = workspaceStore
const { getFormValues, getStepType, getWorkspaceId, getNextBtnDisabled } = toRefs(workspaceStore)

const isEmailValid = ref(true)
const emailValidText = ref('')
const emailValue = ref('')
const inputRef = ref()
const authList = ref<IWorkspace.WorkspaceAuth[]>([])
const selectedAuth = ref()
const inviteEmails = computed(() => [...getFormValues.value.inviteEmails].reverse())

;(async () => {
  try {
    const {
      data: { auths }
    } = await WorkspaceService.getWorkspaceAuthList()
    authList.value = auths
  } catch (err) {
    console.log(err)
  }

  if (unref(getStepType) === null) initFormValueInviteEmails()
})()

/**
 * 이메일에 대한 validation 수행
 * @param email
 */
const emailValidator = async (email: string) => {
  // email 형식 체크
  if (!Util.Validate.isEmail(email)) {
    setEmailValidate({
      isValid: false,
      validText: t('message.validate.checkEmailForm')
    })

    return false
  }

  // 이메일 추가 폼 내부에 존재하는 email 여부 체크
  if (inviteEmails.value.includes(email)) {
    setEmailValidate({
      isValid: false,
      validText: t('message.validate.checkDuplicatedEmail')
    })

    return false
  }

  // 사용자 관리 > 초대하기일 경우
  if (props.isFetch) {
    const { isValid } = await checkManageUsersEmail(email)

    if (!isValid) {
      setEmailValidate({
        isValid: false,
        validText: t('page.workspace.alreadyParticipation')
      })

      return false
    }
  }

  setEmailValidate({
    isValid: true
  })

  return true
}

/**
 * 이메일 입력후 Enter에 대한 input event handler
 * @param event
 */
const onInputEnter: KeyboardEventHandler = async (event) => {
  const email = (event.target as HTMLInputElement).value.trim()
  if (!email) return false

  // email 유효성 검증
  if (!(await emailValidator(email))) {
    setCompleteBtnDisabled(true)
    return
  }

  addEmail(email)

  // 권한 선택 필수 검증
  if (!selectedAuth.value) {
    setCompleteBtnDisabled(true)
    return
  }

  setCompleteBtnDisabled(false)
}

const setCompleteBtnDisabled = (disabled: boolean) => {
  if (unref(getNextBtnDisabled) !== disabled) {
    setNextBtnDisabled(disabled)
  }
}

/**
 * 이메일 추가
 * @param email
 */
const addEmail = (email: string) => {
  pushFormValueInviteEmails(email)
  emailValue.value = ''
}

/**
 * 이메일 입력에 대한 change event handler
 * @param event
 */
const onChangeEmail: ChangeEventHandler = (event) => {
  const email = (event.target as HTMLInputElement).value.trim()

  if (!email && !unref(isEmailValid)) {
    setEmailValidate({
      isValid: true
    })

    if (unref(selectedAuth) && unref(inviteEmails).length) {
      setCompleteBtnDisabled(false)
    }
  }
}

/**
 * 권한 선택 select box 선택 변경에 대한 change event handler
 */
const onChangeSelectedAuth = () => {
  if (unref(inviteEmails).length && unref(selectedAuth)) {
    return setCompleteBtnDisabled(false)
  }

  setCompleteBtnDisabled(true)
}

/**
 * 이메일 tag 삭제에 대한 click event handler
 * @param tag
 */
const onRemove = (tag: string) => {
  removeFormValueInviteEmails(tag)

  if (!unref(inviteEmails).length) {
    setCompleteBtnDisabled(true)
  }
}

/**
 * '이 단계 건너뛰기' 수행에 대한 click event handler
 */
const onSkip = () => {
  setFormValues({ inviteEmails: [] })
  moveNextStep()
}

/**
 * 입력한 이메일에 대한 워크스페이스 내부 존재여부 확인
 * @param email
 * @description 사용자 관리 > 초대하기 내에서 사용됨
 */
const checkManageUsersEmail = async (
  email: string
): Promise<{ success: boolean; isValid: boolean }> => {
  try {
    const {
      data: { exist }
    } = await ManageUserService.checkDuplicatedEmail(getWorkspaceId.value, {
      inviteEmail: email
    })

    if (exist) return { success: true, isValid: false }
    return { success: true, isValid: true }
  } catch (err) {
    console.log(err)
    message.error(t('message.retry'))
    return { success: false, isValid: false }
  }
}

/**
 * 이메일 validation 정보 설정
 * @param param
 */
const setEmailValidate = (param: { isValid: boolean; validText?: string }) => {
  const { isValid, validText = '' } = param
  isEmailValid.value = isValid
  emailValidText.value = validText
}

defineExpose({
  isError: !unref(isEmailValid),
  tags: inviteEmails,
  onInputEnter,
  onInitInviteEmails: initFormValueInviteEmails
})
</script>

<style lang="scss" scoped>
.form-wrapper {
  .select-wrapper {
    min-height: 130px;
    max-height: 227px;
    border: 1px solid;
    border-color: $input-border-color;
    border-radius: 6px;
    padding: 5px;
    overflow-y: auto;
    cursor: text;
    margin-bottom: 30px;

    .tags-wrapper {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 4px;

      .tag {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(0, 0, 0, 0.06);
        color: $color-text-10;
        margin: 2px 0;
        margin-right: 7px;
        padding: 4px;
        padding-left: 10px;
        border-color: rgba(5, 5, 5, 0.06);
        border-radius: 6px;
        font-weight: 400;
        font-size: 15px;
        gap: 2px;

        .icon {
          color: rgba(0, 0, 0, 0.45);
          font-size: 13px;
          padding: 3px 5px;
          cursor: pointer;
        }
      }
    }

    .input-wrapper {
      flex: none;
      align-self: center;
      width: 100%;
      padding: 5px 0;

      .input-box {
        display: inline-flex;
        position: relative;
        width: 100%;

        .input {
          width: 100%;
          height: 24px;
          line-height: 24px;
          margin: 0;
          font-size: 14px !important;
          padding: 3px 5px !important;
          background-color: transparent !important;
          border: none;
          outline: none;
          box-shadow: none;
        }
      }
    }

    &.error {
      border-color: $color-feedback-error !important;
    }
  }

  .jump-wrapper {
    text-align: right;
    margin-top: 30px;

    .jump {
      font-size: $font-size-small;
      color: $color-gray-7;
      border-bottom: 1px solid $color-gray-7;
      cursor: pointer;
    }
  }

  .label {
    font-size: $font-size-base;
    // color: $color-text-sub;
    margin-bottom: 10px;

    &.email-input {
      display: flex;
      justify-content: space-between;
    }

    &.auth-select > span {
      font-size: $font-size-small;
    }

    .error-msg {
      color: $color-feedback-error !important;
      font-size: $font-size-xsmall !important;
    }
  }
}
</style>
