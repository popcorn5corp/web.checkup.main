import { WorkspaceService } from '@/services'
import { store } from '@/stores'
import { Util } from '@/utils'
import { defineStore } from 'pinia'
import { computed, reactive, toRefs, unref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { IWorkspace } from '@/services/workspace/types'
import { WORKSPACE_ID_KEY, WORKSPACE_KEY } from '@/constants/cacheKeyEnum'
import { PagePathEnum } from '@/constants/pageEnum'
import { getStepsInfo } from './data'
import type {
  JoinParamValues,
  UserWorkspace,
  WorkspaceFormValues,
  WorkspaceState,
  WorkspaceStepType
} from './types'

const FIRST_STEP_COUNT = 1 as const

export const useWorkspaceStore = defineStore('workspace', () => {
  const router = useRouter()
  const state = reactive<WorkspaceState>({
    stepType: null, // 'create' | 'invite' | null
    currentStep: FIRST_STEP_COUNT, // 현재 step
    steps: [], // create|invite 의 step에 관한 content
    nextBtnDisabled: true, // 다음버튼 비활성화 유무
    formValues: getDefaultFormValues(),
    joinParam: {
      workspaceId: '', // 워크스페이스 id
      workspaceInviteLogId: '', // 워크스페이스 초대로그 id
      workspaceName: '' // 워크스페이스 이름
    },
    selectedWorkspaceId: Util.Storage.get(WORKSPACE_ID_KEY),
    workspace: null
  })

  const getStepType = computed(() => state.stepType)
  const getWorkspace = computed(() => state.workspace)
  const getCurrentStep = computed(() => state.currentStep)
  const getNextBtnDisabled = computed(() => state.nextBtnDisabled)
  const getWorkspaceId = computed(() => state.selectedWorkspaceId)
  const getWorkspaceInviteLogId = computed(() => state.joinParam.workspaceInviteLogId)
  const getWorkspaceName = computed(() => state.joinParam.workspaceName)
  const getFormValues = computed(() => state.formValues)
  const getSteps = computed(() => getStepsInfo(state.stepType))
  const getJoinParam = computed(() => state.joinParam)

  watch(getCurrentStep, (currentStep: number) => {
    if (currentStep) {
      state.nextBtnDisabled = true
    }
  })

  function prevCurrentStep() {
    if (state.currentStep === FIRST_STEP_COUNT) {
      state.stepType = null
      router.push(PagePathEnum.WORKSPACE)
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

  function setWorkspace(params: UserWorkspace) {
    state.workspace = {
      ...params
    }

    Util.Storage.set(WORKSPACE_KEY, state.workspace)
  }

  function setSelectedWorkspaceId(workspaceId: string | null) {
    if (unref(getWorkspaceId) !== workspaceId) {
      initWorkspace()
    }

    state.selectedWorkspaceId = workspaceId
    Util.Storage.set(WORKSPACE_ID_KEY, workspaceId)
  }

  function setNextBtnDisabled(disabled: boolean) {
    state.nextBtnDisabled = disabled
  }

  function setFormValueImgFile({
    url,
    originName,
    saveName,
    path,
    size,
    ext
  }: Omit<IWorkspace.ImageFileInfo, 'name'> & { saveName: string }) {
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

  function pushFormValueInviteEmails(email: string) {
    state.formValues.inviteEmails.push(email)
  }

  function removeFormValueInviteEmails(targetEmail: string) {
    state.formValues.inviteEmails = state.formValues.inviteEmails.filter(
      (email) => email !== targetEmail
    )
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

        const workspace = {
          workspaceId,
          workspaceName,
          user: {
            ...workspaceUser,
            status: {
              ...workspaceUser.userStatus
            }
          }
        }

        setWorkspace(workspace)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function initFormValueInviteEmails() {
    state.formValues.inviteEmails = []
  }

  function initWorkspace() {
    state.workspace = null
    Util.Storage.remove(WORKSPACE_ID_KEY)
  }

  function initCurrentStep() {
    if (state.currentStep !== FIRST_STEP_COUNT) {
      state.currentStep = FIRST_STEP_COUNT
    }
  }

  function initFormValues() {
    state.formValues = getDefaultFormValues()
  }

  return {
    ...toRefs(state),
    getStepType,
    getWorkspace,
    getCurrentStep,
    getSteps,
    getNextBtnDisabled,
    getWorkspaceId,
    getWorkspaceInviteLogId,
    getWorkspaceName,
    getFormValues,
    getJoinParam,
    initCurrentStep,
    prevCurrentStep,
    nextCurrentStep,
    setStepType,
    setNextBtnDisabled,
    setWorkspace,
    initWorkspace,
    pushFormValueInviteEmails,
    removeFormValueInviteEmails,
    initFormValueInviteEmails,
    initFormValues,
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

function getDefaultFormValues(): WorkspaceFormValues {
  return {
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
  }
}
