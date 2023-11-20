import { defineStore } from 'pinia'
import { type Component, computed, reactive, watch } from 'vue'
// import { useRouter } from 'vue-router'
import NameProfileForm from '@/views/workspace/components/NameProfileForm.vue'
import BuisnessTypeForm from '@/views/workspace/components/create/BuisnessTypeForm.vue'
import CreateComplete from '@/views/workspace/components/create/CreateComplete.vue'
import InviteMemberForm from '@/views/workspace/components/create/InviteMemberForm.vue'
import WorkspaceNameForm from '@/views/workspace/components/create/WorkspaceNameForm.vue'
import InviteCodeFormVue from '@/views/workspace/components/invite/InviteCodeForm.vue'
import JoinCompleteVue from '@/views/workspace/components/invite/JoinComplete.vue'

export interface WorkspaceFormValues {
  workspaceName: string
  nickname: string
  inviteEmails: string[]
  businessTypeCode: string
  employeeScaleCode: string
  originName: string
  saveName: string
  path: string
  size: number
  ext: string
  inviteCode: string
}
export type WorkspaceStepType = '' | 'create' | 'invite'

export interface WorkspaceState {
  type: WorkspaceStepType
  currentStep: number
  steps: WorkspaceStep[]
  nextBtnDisabled: boolean
  formValues: WorkspaceFormValues
}

interface WorkspaceStep {
  title: string
  currentStep: number
  isComplete: boolean
  isJump: boolean
  nextBtnText: string | null
  component: Component
}

export const useWorkspceStore = defineStore('workspace', () => {
  // const router = useRouter()

  // state
  const state = reactive<WorkspaceState>({
    type: '', // create || invite
    currentStep: 1,
    steps: [],
    nextBtnDisabled: false,
    formValues: {
      workspaceName: '', // 워크스페이스 네임
      nickname: '', // 유저가 설정한 이름
      inviteEmails: [], // 	초대 유저 email
      businessTypeCode: '', // 업종코드
      employeeScaleCode: '', // 회사 규모
      originName: 'avatar7.jpeg', // 프로필 이미지 이름 ex)다운로드.jpg
      saveName: '9aa700c8-d52a-4b62-9ebb-d14ea5a133f7.jpeg', // 서버에 저장된 파일 이름
      path: '/CheckUp/test/9aa700c8-d52a-4b62-9ebb-d14ea5a133f7.jpeg', // 파일 path
      size: 79440, // 파일 size
      ext: 'jpeg', // 파일 확장자
      inviteCode: '' // 초대코드
    }
  })

  // getter
  const type = computed(() => state.type)
  const currentStep = computed(() => state.currentStep)
  const nextBtnDisabled = computed(() => state.nextBtnDisabled)
  const formValues = computed<WorkspaceFormValues>(() => state.formValues)
  const steps = computed(() => {
    if (state.type === 'create') {
      return createStep
    } else {
      return inviteStep
    }
  })

  // action
  function resetCurrentStep() {
    state.currentStep = 1
  }

  function prevCurrentStep() {
    if (state.currentStep > 1) {
      state.currentStep -= 1
    }
    if (state.currentStep === 1) {
      resetType()
      resetCurrentStep()
    }
  }
  function nextCurrentStep() {
    state.currentStep += 1
  }

  function resetType() {
    state.type = ''
  }

  function setType(type: WorkspaceStepType) {
    state.type = type
  }

  function setNextBtnDisabled(disabled: boolean) {
    state.nextBtnDisabled = disabled
  }

  function setFormValueInviteEmails(emails: string[]) {
    state.formValues.inviteEmails = emails
  }

  watch(currentStep, (currentStep) => {
    console.log('step: ', currentStep)
    if (currentStep) {
      state.nextBtnDisabled = false
    }
  })

  watch(type, (type) => {
    console.log('type: ', type)
  })

  return {
    type,
    currentStep,
    steps,
    nextBtnDisabled,
    formValues,
    resetCurrentStep,
    prevCurrentStep,
    nextCurrentStep,
    resetType,
    setType,
    setNextBtnDisabled,
    setFormValueInviteEmails
  }
})

const createStep = [
  {
    title: 'workspaceName',
    step: 1,
    isComplete: false,
    isJump: false,
    nextBtnText: '다음',
    component: WorkspaceNameForm
  },
  {
    title: 'nameProfile',
    step: 2,
    isComplete: false,
    isJump: false,
    nextBtnText: '다음',
    component: NameProfileForm
  },
  {
    title: 'inviteMember',
    step: 3,
    isComplete: false,
    isJump: true,
    nextBtnText: '다음',
    component: InviteMemberForm
  },
  {
    title: 'buisnessType',
    step: 4,
    isComplete: true,
    isJump: false,
    nextBtnText: '완료하기',
    component: BuisnessTypeForm
  },
  {
    title: 'createComplete',
    step: 5,
    isComplete: false,
    isJump: false,
    nextBtnText: null,
    component: CreateComplete
  }
]

const inviteStep = [
  {
    title: 'inviteCode',
    step: 1,
    isComplete: false,
    isJump: false,
    nextBtnText: '다음',
    component: InviteCodeFormVue
  },
  {
    title: 'nameProfile',
    step: 2,
    isComplete: true,
    isJump: false,
    nextBtnText: '참여하기',
    component: NameProfileForm
  },
  {
    title: 'inviteComplete',
    step: 3,
    isComplete: false,
    isJump: false,
    nextBtnText: null,
    component: JoinCompleteVue
  }
]
