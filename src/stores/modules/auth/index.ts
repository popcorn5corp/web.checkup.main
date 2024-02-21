import { router } from '@/router'
import { AuthService, WorkspaceService } from '@/services'
import { Util } from '@/utils'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/cacheKeyEnum'
import { PagePathEnum } from '@/constants/pageEnum'
import type { AuthState, IUser, TokenKey } from './types'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const state = reactive<AuthState>({
      user: Util.Storage.get<IUser>('user') || getDefaultUser(),
      token: Util.Storage.get<string>(ACCESS_TOKEN_KEY),
      loggedIn: false
    })
    const { setSelectedWorkspaceId } = useWorkspaceStore()
    const getUser = computed(() => state.user)
    const getToken = computed(() => state.token)

    async function login() {
      return AuthService.getUser().then(
        async (user) => {
          console.log('[user]', user)
          setUser(user)
          state.loggedIn = true
          Util.Storage.set('user', user)
          return await afterLoginAction()
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
        router.push(goPath)

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
          const {
            defaultWorkspace: useDefaultWorkspace,
            defaultWorkspaceId,
            workspaceInfoList
          } = data
          setUser({ useDefaultWorkspace })
          console.log('[workspaces] :: ', data)

          if (useDefaultWorkspace) {
            /************************************************************
             * case: defaultWorkspace 설정한 경우
             * - workspace 상세 조회 API 호출
             * - 메인 화면으로 이동
             ************************************************************/
            setSelectedWorkspaceId(defaultWorkspaceId)
            goPath = PagePathEnum.BASE_HOME
          } else if (!useDefaultWorkspace && workspaceInfoList.length === 1) {
            /************************************************************
             * case: defaultWorkspace 설정하지 않고 workspace 목록이 한개일 경우
             * - workspace 상세 조회 API 호출
             * - data.workspaceInfoList[0].workspaceId로 호풀
             * - 메인 화면으로 이동
             ************************************************************/
            setSelectedWorkspaceId(workspaceInfoList[0].workspaceId)
            goPath = PagePathEnum.BASE_HOME
          } else if (!useDefaultWorkspace && workspaceInfoList.length > 1) {
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

    function setRefreshToken(tokenKey: TokenKey = REFRESH_TOKEN_KEY, token: string) {
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
      login,
      afterLoginAction,
      logout,
      setToken,
      setRefreshToken,
      removeToken,
      removeUser
    }
  },
  {
    persist: true
  }
)

function getDefaultUser(): IUser {
  return {
    uid: '',
    userId: '',
    userName: '',
    workspaceCount: 0,
    userEmail: '',
    useDefaultWorkspace: false
  }
}
