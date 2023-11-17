import { defineStore } from 'pinia'
import { type Component, computed, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

// import NameProfileForm from '@/views/workspace/components/NameProfileForm.vue'
// import BuisnessTypeForm from '@/views/workspace/components/create/BuisnessTypeForm.vue'
// import CreateComplete from '@/views/workspace/components/create/CreateComplete.vue'
// import InviteMemberForm from '@/views/workspace/components/create/InviteMemberForm.vue'
// import WorkspaceNameForm from '@/views/workspace/components/create/WorkspaceNameForm.vue'

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
  step: number
  nextBtnDisabled: boolean
  formValues: WorkspaceFormValues
}

interface WorkspaceStep {
  title: string
  step: number
  isComplete: boolean
  isJump: boolean
  nextBtnText: string
  component?: Component
}

export interface WorkspaceSteps {
  create: WorkspaceStep[]
  invite: WorkspaceStep[]
}

export const useWorkspceStore = defineStore('workspace', () => {
  const router = useRouter()

  // state
  const state = reactive<WorkspaceState>({
    type: '', // create || invite
    step: 1,
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
  const step = computed(() => state.step)
  const nextBtnDisabled = computed(() => state.nextBtnDisabled)
  const formValues = computed<WorkspaceFormValues>(() => state.formValues)

  // action
  function resetStep() {
    state.step = 1
  }

  function prevStep() {
    if (state.step > 1) {
      state.step -= 1
    }
    if (state.step === 1) {
      resetType()
      resetStep()
    }
  }
  function nextStep() {
    state.step += 1
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
  // TODO formVlaues{ key,vlaue}
  // function setFormValues(formValues: FormValues) {
  //   state.formValues = formValues
  //   // state.formValues = {
  //   //   ... state.formValues,
  //   //   formValues
  //   // }
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

  watch(type, (type) => {
    console.log('type', type)
    if (type) {
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
export const workspaceSteps: WorkspaceSteps = {
  create: [
    {
      title: 'workspaceName',
      step: 1,
      isComplete: false,
      isJump: false,
      nextBtnText: '다음'
      // component: <WorkspaceNameForm />
    },
    {
      title: 'nameProfile',
      step: 2,
      isComplete: false,
      isJump: false,
      nextBtnText: '다음'
      // component: `<WorkspaceNameForm />`
    },
    {
      title: 'inviteMember',
      step: 3,
      isComplete: false,
      isJump: true,
      nextBtnText: '다음'
      // component: `<WorkspaceNameForm />`
    },
    {
      title: 'buisnessType',
      step: 4,
      isComplete: true,
      isJump: false,
      nextBtnText: '완료하기'
      // component: `<WorkspaceNameForm />`
    },
    {
      title: 'createComplete',
      step: 5,
      isComplete: false,
      isJump: false,
      nextBtnText: ''
      // component: `<WorkspaceNameForm />`
    }
  ],
  invite: [
    {
      title: 'inviteCode',
      step: 1,
      isComplete: false,
      isJump: false,
      nextBtnText: '다음'
      // component: `<inviteCodeForm />`
    },
    {
      title: 'nameProfile',
      step: 2,
      isComplete: true,
      isJump: false,
      nextBtnText: '참여하기'
      // component: `<WorkspaceNameForm />`
    },
    {
      title: 'inviteComplete',
      step: 3,
      isComplete: false,
      isJump: false,
      nextBtnText: ''
      // component: `<WorkspaceNameForm />`
    }
  ]
}
// export const createStep = [
//   {
//     title: 'workspaceName',
//     step: 1,
//     isComplete: false,
//     isJump: false,
//     nextBtnText: '다음',
//     component: `<WorkspaceNameForm />`
//   },
//   {
//     title: 'nameProfile',
//     step: 2,
//     isComplete: false,
//     isJump: false,
//     nextBtnText: '다음',
//     component: `<WorkspaceNameForm />`
//   },
//   {
//     title: 'inviteMember',
//     step: 3,
//     isComplete: false,
//     isJump: true,
//     nextBtnText: '다음',
//     component: `<WorkspaceNameForm />`
//   },
//   {
//     title: 'buisnessType',
//     step: 4,
//     isComplete: true,
//     isJump: false,
//     nextBtnText: '완료하기',
//     component: `<WorkspaceNameForm />`
//   },
//   {
//     title: 'createComplete',
//     step: 5,
//     isComplete: false,
//     isJump: false,
//     nextBtnText: '',
//     component: `<WorkspaceNameForm />`
//   }
// ]

// export const inviteStep = [
//   {
//     title: 'inviteCode',
//     step: 1,
//     isComplete: false,
//     isJump: false,
//     nextBtnText: '다음',
//     component: `<inviteCodeForm />`
//   },
//   {
//     title: 'nameProfile',
//     step: 2,
//     isComplete: true,
//     isJump: false,
//     nextBtnText: '참여하기',
//     component: `<WorkspaceNameForm />`
//   },
//   {
//     title: 'inviteComplete',
//     step: 3,
//     isComplete: false,
//     isJump: false,
//     nextBtnText: '',
//     component: `<WorkspaceNameForm />`
//   }
// ]
