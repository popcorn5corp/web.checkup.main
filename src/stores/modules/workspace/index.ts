import { Helper } from '@/helpers'
import { WorkspaceService } from '@/services'
import { store } from '@/stores'
import { Util } from '@/utils'
import { defineStore } from 'pinia'
import { computed, reactive, toRefs, unref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { IWorkspace } from '@/services/workspace/types'
import { useTheme } from '@/hooks/useTheme'
import { useLocale } from '@/locales/hooks/useLocale'
import { WORKSPACE_ID_KEY, WORKSPACE_KEY } from '@/constants/cacheKeyEnum'
import { PagePathEnum } from '@/constants/pageEnum'
import { getDefaultWorkspace, getStepsInfo } from './data'
import { getDefaultFormValues } from './data'
import type {
  JoinParamValues,
  UserWorkspace,
  WorkspaceSettings,
  WorkspaceState,
  WorkspaceStepType
} from './types'

const FIRST_STEP_COUNT = 1 as const

export const useWorkspaceStore = defineStore('workspace', () => {
  const router = useRouter()
  const { setLocale } = useLocale()
  const { setInitTheme } = useTheme()
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
    workspace: getDefaultWorkspace(),
    // settings: getDefaultWorkspaceSettings(),
    isCompleteWorkspaceLoad: false,
    menus: []
  })

  const getWorkspace = computed(() => state.workspace)
  const getSettings = computed(() => state.workspace.settings)
  const getMenus = computed(() => state.menus)

  const getStepType = computed(() => state.stepType)
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

  function setWorkspace(workspace: UserWorkspace) {
    state.workspace = {
      ...workspace
    }
    Util.Storage.set(WORKSPACE_KEY, state.workspace)
  }

  function setSelectedWorkspaceId(workspaceId: string) {
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

  async function getUserWorkspace(): Promise<void> {
    try {
      const { success, data } = await WorkspaceService.getUserWorkspace(
        state.selectedWorkspaceId as string
      )

      if (!success) return Promise.reject()

      const {
        workspace: { workspaceId, workspaceName },
        workspaceUser,
        workspaceSettings
      } = data

      const workspace: UserWorkspace = {
        workspaceId,
        workspaceName,
        user: {
          ...workspaceUser,
          status: {
            ...workspaceUser.userStatus
          }
        },
        settings: workspaceSettings
      }

      return await afterWorkspaceAction(workspace)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async function afterWorkspaceAction(workspace: UserWorkspace): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          settings: { language }
        } = workspace

        await getWorkspaceMenu()
        setWorkspace(workspace)
        setInitTheme(workspace.settings)
        setLocale(language.language)

        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  async function getWorkspaceMenu(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, success } = await WorkspaceService.getWorkspaceMenu(unref(getWorkspaceId))

        if (success) {
          state.menus = Helper.Menu.getMenus(data.menus)
          resolve()
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  function updateWorkspaceSettings(values: Partial<WorkspaceSettings>): Promise<void> {
    const settings = {
      ...(state.workspace as UserWorkspace).settings,
      ...values
    }

    return new Promise(async (resolve, reject) => {
      try {
        const { success, data } = await WorkspaceService.updateWorkspaceSettings(
          state.selectedWorkspaceId,
          settings
        )

        if (!success) reject()

        state.workspace.settings = {
          ...data
        }

        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  function initFormValueInviteEmails() {
    state.formValues.inviteEmails = []
  }

  function initWorkspace() {
    state.workspace = getDefaultWorkspace()
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
    getMenus,
    getWorkspace,
    getWorkspaceId,
    getWorkspaceName,
    getStepType,
    getSettings,
    getCurrentStep,
    getSteps,
    getNextBtnDisabled,
    getWorkspaceInviteLogId,
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
    setSelectedWorkspaceId,
    updateWorkspaceSettings
  }
})

// for outside the setup
export function useWorkspaceStoreWithOut() {
  return useWorkspaceStore(store)
}
