import { router } from '@/router'
import { AuthService, WorkspaceService } from '@/services'
import { Util } from '@/utils'
import { message } from 'ant-design-vue'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import type { IAuth } from '@/services/auth/interface'
import type { IWorkspace } from '@/services/workspace/interface'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/cacheKeyEnum'
import { PagePathEnum } from '@/constants/pageEnum'
// import { store } from '../'
import type { TokenKey } from '../interface'
import { useWorkspaceStore } from './workspace'

export type IUser = IAuth.UserResponse & { useDetaulWorkspace: boolean }
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

interface AuthState {
  user: IUser
  loggedIn: boolean
  token: string
  workspace: IUserWorkspace
}

function getDefaultUser(): IUser {
  return {
    uid: '',
    userId: '',
    userName: '',
    workspaceCount: 0,
    userEmail: '',
    useDetaulWorkspace: false
  }
}

function getDefaultWorkspace(): IUserWorkspace {
  return {
    workspaceId: '',
    workspaceName: '',
    user: {
      workspaceUserId: '',
      email: '',
      nickname: '',
      profile: '',
      status: {
        label: '',
        value: 'ACTIVE'
      }
    }
  }
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    const state = reactive<AuthState>({
      user: Util.Storage.get<IUser>('user') || getDefaultUser(),
      token: Util.Storage.get<string>(ACCESS_TOKEN_KEY),
      loggedIn: false,
      workspace: getDefaultWorkspace()
    })

    const { setSelectedWorkspaceId } = useWorkspaceStore()
    const getUser = computed(() => state.user)
    const getToken = computed(() => state.token)
    const getUserWorkspace = computed(() => state.workspace)

    function login() {
      return AuthService.login().then(
        async (user) => {
          console.log('[user]', user)
          setUser(user)
          state.loggedIn = true
          Util.Storage.set('user', user)
          return afterLoginAction()
        },
        (error) => {
          state.user = getDefaultUser()
          state.loggedIn = false
          return Promise.reject(error)
        }
      )
    }

    function setUser(values: Partial<IUser>) {
      state.user = {
        ...state.user,
        ...values
      }
    }

    async function afterLoginAction() {
      try {
        const { goPath } = await workspaceAction()

        setTimeout(() => {
          router.push(goPath)
        }, 2000)

        return {
          goPath
        }
      } catch (error) {
        return Promise.reject(error)
      }
    }

    async function workspaceAction() {
      try {
        let goPath = ''
        const workspaceCount = state.user.workspaceCount

        if (workspaceCount === 0) {
          /************************************************************
           * case: workspace 없을 경우
           * - workspace 목록 조회 API 호출
           ************************************************************/
          goPath = PagePathEnum.WORKSPACE
        } else {
          /************************************************************
           * case: workspace 존재할 경우
           * - workspace 목록 조회 API 호출
           ************************************************************/
          const { data } = await WorkspaceService.getWorkspaceList()
          const { defaultWorkspace, defaultWorkspaceId, workspaceInfoList } = data
          setUser({ useDetaulWorkspace: defaultWorkspace })
          console.log('[workspaces] :: ', data)

          if (defaultWorkspace) {
            /************************************************************
             * case: defaultWorkspace 설정한 경우
             * - workspace 상세 조회 API 호출
             * - 메인 화면으로 이동
             ************************************************************/
            setSelectedWorkspaceId(defaultWorkspaceId)
            goPath = PagePathEnum.BASE_HOME
          } else if (!defaultWorkspace && workspaceInfoList.length === 1) {
            /************************************************************
             * case: defaultWorkspace 설정하지 않고 workspace 목록이 한개일 경우
             * - workspace 상세 조회 API 호출
             * - data.workspaceInfoList[0].workspaceId로 호풀
             * - 메인 화면으로 이동
             ************************************************************/
            setSelectedWorkspaceId(workspaceInfoList[0].workspaceId)
            goPath = PagePathEnum.BASE_HOME
          } else if (!defaultWorkspace && workspaceInfoList.length > 1) {
            /************************************************************
             * case: defaultWorkspace 설정하지 않고 workspace 목록이 여러개일 경우
             * - workspace 목록 화면으로 이동
             ************************************************************/
            goPath = PagePathEnum.WORKSPACE_LIST
          }
        }

        return {
          goPath
        }
      } catch (error) {
        return Promise.reject(error)
      }
    }

    function logout(goLogin = true) {
      Util.Storage.clear()
      state.loggedIn = false
      state.token = ''
      state.user = getDefaultUser()
      goLogin && router.push(PagePathEnum.BASE_LOGIN)
    }

    function setToken(tokenKey: TokenKey = ACCESS_TOKEN_KEY, token: string) {
      state.token = token
      Util.Storage.set(tokenKey, token)
    }

    // function getToken(tokenKey: TokenKey = ACCESS_TOKEN_KEY) {
    //   return Util.Storage.get<string>(tokenKey)
    // }

    function removeToken() {
      Util.Storage.remove(ACCESS_TOKEN_KEY)
      Util.Storage.remove(REFRESH_TOKEN_KEY)
    }

    function removeUser() {
      Util.Storage.remove('user')
    }

    return {
      getUser,
      getToken,
      getUserWorkspace,
      login,
      afterLoginAction,
      logout,
      setToken,
      removeToken,
      removeUser
    }
  },
  {
    persist: true
  }
)
