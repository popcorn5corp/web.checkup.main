import { WorkspaceService } from '@/services'
import { store } from '@/stores'
import { Util } from '@/utils'
import { defineStore } from 'pinia'
import { type Component, computed, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { IWorkspace } from '@/services/workspace/interface'
import NameProfileForm from '@/views/workspace/components/NameProfileForm.vue'
import BuisnessTypeForm from '@/views/workspace/components/create/BuisnessTypeForm.vue'
import CreateComplete from '@/views/workspace/components/create/CreateComplete.vue'
import InviteMemberForm from '@/views/workspace/components/create/InviteMemberForm.vue'
import WorkspaceNameForm from '@/views/workspace/components/create/WorkspaceNameForm.vue'
import InviteCodeFormVue from '@/views/workspace/components/invite/InviteCodeForm.vue'
import JoinCompleteVue from '@/views/workspace/components/invite/JoinComplete.vue'
import { WORKSPACE_ID_KEY, WORKSPACE_KEY } from '@/constants/cacheKeyEnum'

export interface Workspace {
  workspaceId: string
  workspaceName: string
}

export interface WorkspaceFormValues {
  workspaceName: string
  nickname: string
  inviteEmails: string[]
  businessTypeCode: string
  employeeScaleCode: string
  originName: string
  saveName: string
  url: string
  path: string
  size: number
  ext: string
  inviteCode: string
}

export const workspaceStepTypes = ['create', 'invite', null] as const
export type WorkspaceStepType = (typeof workspaceStepTypes)[number]

export interface JoinParamValues {
  workspaceId: string
  workspaceInviteLogId: string
  workspaceName: string
}

export interface WorkspaceUsers {
  uid: string
  nickname: string
  userImagePath: string
}

export type IUserWorkspace = {
  workspaceId: string
  workspaceName: string
  user: {
    workspaceUserId: string
    email: string
    nickname: string
    profile: string
    status: {
      label: string
      value: IWorkspace.UserStatus
    }
  }
}

export interface WorkspaceState {
  stepType: WorkspaceStepType
  currentStep: number
  steps: WorkspaceStep[]
  nextBtnDisabled: boolean
  formValues: WorkspaceFormValues
  joinParam: JoinParamValues
  workspace: IUserWorkspace | null
  selectedWorkspaceId: string | null
}

interface WorkspaceStep {
  title: string
  step: number
  isComplete: boolean
  isJump: boolean
  nextBtnText: string | null
  component: Component
}

const FIRST_STEP_COUNT = 1 as const

export const useWorkspaceStore = defineStore('workspace', () => {
  const { t } = useI18n()
  const router = useRouter()
  // state
  const state = reactive<WorkspaceState>({
    stepType: null, // 'create' | 'invite' | null
    currentStep: FIRST_STEP_COUNT, // 현재 step
    steps: [], // create|invite 의 step에 관한 content
    nextBtnDisabled: true, // 다음버튼 비활성화 유무
    formValues: {
      workspaceName: '', // 워크스페이스 이름
      nickname: '', // 유저가 설정한 이름
      inviteEmails: [], // 	초대 유저 email
      businessTypeCode: '', // 업종코드
      employeeScaleCode: '', // 회사 규모
      originName: '', // 프로필 이미지 이름
      saveName: '', // 서버에 저장된 파일 이름
      url: '', // 파일 url
      path: '', // 파일 path
      size: 0, // 파일 size
      ext: '', // 파일 확장자
      inviteCode: '' // 초대코드
    },
    joinParam: {
      workspaceId: '', // 워크스페이스 id
      workspaceInviteLogId: '', // 워크스페이스 초대로그 id
      workspaceName: '' // 워크스페이스 이름
    },
    // workspace: Util.Storage.get(WORKSPACE_KEY) || {
    //   workspaceId: '',
    //   workspaceName: ''
    // },
    selectedWorkspaceId: Util.Storage.get(WORKSPACE_ID_KEY),
    workspace: null
  })

  // getter
  const getStepType = computed(() => state.stepType)
  const getWorkspace = computed(() => state.workspace)
  const getCurrentStep = computed(() => state.currentStep)
  const getNextBtnDisabled = computed(() => state.nextBtnDisabled)
  const getWorkspaceId = computed(() => state.selectedWorkspaceId)
  const getWorkspaceInviteLogId = computed(() => state.joinParam.workspaceInviteLogId)
  const getWorkspaceName = computed(() => state.joinParam.workspaceName)
  const getFormValues = computed<WorkspaceFormValues>(() => state.formValues)
  const getSteps = computed(() => (state.stepType === 'create' ? createStep : inviteStep))

  watch(getCurrentStep, (currentStep: number) => {
    if (currentStep) {
      state.nextBtnDisabled = true
    }
  })

  // action
  function prevCurrentStep() {
    if (state.currentStep === FIRST_STEP_COUNT) {
      resetType()
      router.push({
        name: 'workspace-welcome'
      })
    } else if (state.currentStep > FIRST_STEP_COUNT) {
      state.currentStep -= 1
    }
  }

  function nextCurrentStep() {
    state.currentStep += 1
  }

  function setStepType(setpType: WorkspaceStepType) {
    state.stepType = setpType
  }

  function setWorkspace(params: IUserWorkspace) {
    state.workspace = {
      ...params
    }

    Util.Storage.set(WORKSPACE_KEY, state.workspace)
  }

  function initWorkspace() {
    state.workspace = null
    Util.Storage.remove(WORKSPACE_ID_KEY)
  }

  function setSelectedWorkspaceId(workspaceId: string) {
    state.selectedWorkspaceId = workspaceId
    Util.Storage.set(WORKSPACE_ID_KEY, workspaceId)
  }

  function setNextBtnDisabled(disabled: boolean) {
    state.nextBtnDisabled = disabled
  }

  function pushFormValueInviteEmails(email: string) {
    state.formValues.inviteEmails.push(email)
  }

  function removeFormValueInviteEmails(targetEmail: string) {
    state.formValues.inviteEmails = state.formValues.inviteEmails.filter(
      (email) => email !== targetEmail
    )
  }

  function initFormValueInviteEmails() {
    state.formValues.inviteEmails = []
  }

  function setFormValueImgFile({
    url,
    originName,
    saveName,
    path,
    size,
    ext
  }: Partial<WorkspaceFormValues>) {
    state.formValues.url = url || ''
    state.formValues.originName = originName || ''
    state.formValues.saveName = saveName || ''
    state.formValues.path = path || ''
    state.formValues.size = size || 0
    state.formValues.ext = ext || ''
  }

  function setJoinParam(param: Partial<JoinParamValues>) {
    state.joinParam = {
      ...state.joinParam,
      ...param
    }
  }

  /**
   * @description 워크스페이스 상세정보 조회
   * @param workspaceId
   */
  async function getUserWorkspace(workspaceId?: string) {
    try {
      const { data, success } = await WorkspaceService.getUserWorkspace(
        workspaceId || (state.selectedWorkspaceId as string)
      )

      if (success) {
        const {
          workspace: { workspaceId, workspaceName },
          workspaceUser
        } = data

        state.workspace = {
          workspaceId,
          workspaceName,
          user: {
            ...workspaceUser,
            status: {
              ...workspaceUser.userStatus
            }
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  function resetType() {
    state.stepType = null
  }

  function resetCurrentStep() {
    if (state.currentStep !== FIRST_STEP_COUNT) {
      state.currentStep = FIRST_STEP_COUNT
    }
  }

  const createStep: WorkspaceStep[] = [
    {
      title: 'workspaceName',
      step: 1,
      isComplete: false,
      isJump: false,
      nextBtnText: t('component.button.next'),
      component: WorkspaceNameForm
    },
    {
      title: 'nameProfile',
      step: 2,
      isComplete: false,
      isJump: false,
      nextBtnText: t('component.button.next'),
      component: NameProfileForm
    },
    {
      title: 'inviteMember',
      step: 3,
      isComplete: false,
      isJump: true,
      nextBtnText: t('component.button.next'),
      component: InviteMemberForm
    },
    {
      title: 'buisnessType',
      step: 4,
      isComplete: true,
      isJump: false,
      nextBtnText: t('component.button.complete'),
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

  const inviteStep: WorkspaceStep[] = [
    {
      title: 'inviteCode',
      step: 1,
      isComplete: false,
      isJump: false,
      nextBtnText: t('component.button.next'),
      component: InviteCodeFormVue
    },
    {
      title: 'nameProfile',
      step: 2,
      isComplete: true,
      isJump: false,
      nextBtnText: t('component.button.joined'),
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

  return {
    getStepType,
    getWorkspace,
    getCurrentStep,
    getSteps,
    getNextBtnDisabled,
    getWorkspaceId,
    getWorkspaceInviteLogId,
    getWorkspaceName,
    getFormValues,
    resetCurrentStep,
    prevCurrentStep,
    nextCurrentStep,
    resetType,
    setStepType,
    setNextBtnDisabled,
    setWorkspace,
    initWorkspace,
    pushFormValueInviteEmails,
    removeFormValueInviteEmails,
    initFormValueInviteEmails,
    setFormValueImgFile,
    getUserWorkspace,
    setJoinParam,
    setSelectedWorkspaceId
  }
})

// for outside the setup
export function useWorkspaceStoreWithOut() {
  return useWorkspaceStore(store)
}
