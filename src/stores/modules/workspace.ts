import { defineStore } from 'pinia'
import { computed, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

export interface FormValues {
  workspaceName: string
  nickname: string
  inviteEmails: string[]
  businessTypeCode: string
  employeeScaleCode: string
  originName: string
  saveName: string
  path: string
  size: string
  ext: string
  inviteCode: string
}

export const useWorkspceStore = defineStore('workspace', () => {
  const router = useRouter()

  // state
  const state = reactive({
    type: '', // create || invite
    step: 0,
    nextBtnDisabled: false,
    formValues: {
      workspaceName: '', // 워크스페이스 네임
      nickname: '', // 유저가 설정한 이름
      inviteEmails: [], // 	초대 유저 email
      businessTypeCode: null, // 업종코드
      employeeScaleCode: null, // 회사 규모
      originName: '', // 프로필 이미지 이름 ex)다운로드.jpg
      saveName: '', // 서버에 저장된 파일 이름
      path: '', // 파일 path
      size: '', // 파일 size
      ext: '', // 파일 확장자
      inviteCode: '' // 초대코드
    }
  })

  // getter
  const type = computed(() => state.type)
  const step = computed(() => state.step)
  const nextBtnDisabled = computed(() => state.nextBtnDisabled)
  const formValues = computed<FormValues>(() => state.formValues)

  // action
  function resetStep() {
    state.step = 0
  }
  function prevStep() {
    if (state.step > 0) {
      state.step -= 1
    }
    if (state.step === 0) {
      router.push({
        name: 'welcome'
      })
    }
  }
  function nextStep() {
    state.step += 1
  }

  function resetType() {
    state.type = ''
  }

  function setType(type: string) {
    state.type = type
  }

  function setNextBtnDisabled(disabled: boolean) {
    state.nextBtnDisabled = disabled
  }

  // function setFormValues(formValues: FormValues) {
  //   state.formValues = formValues
  //   // state.formValues.workspaceName = formValues.workspaceName
  //   // state.formValues.nickname = formValues.nickname
  //   // state.formValues.origin_name = formValues.origin_name
  //   // state.formValues.inviteEmails = formValues.inviteEmails
  //   // state.formValues.businessTypeCode = formValues.businessTypeCode
  //   // state.formValues.employeeScaleCode = formValues.employeeScaleCode
  // }

  watch(step, (step) => {
    if (step) {
      state.nextBtnDisabled = false
    }
  })

  return {
    type,
    step,
    nextBtnDisabled,
    formValues,
    resetStep,
    prevStep,
    nextStep,
    resetType,
    setType,
    setNextBtnDisabled
    // setFormValues
  }
})
