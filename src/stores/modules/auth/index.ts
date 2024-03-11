import { router } from '@/router'
import { AuthService, WorkspaceService } from '@/services'
import { Util } from '@/utils'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import type { IAuth } from '@/services/auth/types'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { locales } from '@/helpers/localeHelper'
import { useLocale } from '@/locales/hooks/useLocale'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_INFO_KEY } from '@/constants/cacheKeyEnum'
import { PagePathEnum } from '@/constants/pageEnum'
import type { AuthState, IUser } from './types'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const state = reactive<AuthState>({
      user: Util.Storage.get<IUser>('user') || getDefaultUser(),
      token: Util.Storage.get<string>(ACCESS_TOKEN_KEY),
      loggedIn: false,
      loading: false
    })
    const { setSelectedWorkspaceId } = useWorkspaceStore()
    const { setLocale } = useLocale()

    const getUser = computed(() => state.user)
    const getToken = computed(() => state.token)
    const getLoggedIn = computed(() => state.loggedIn)
    const getLoading = computed(() => state.loading)

    /**
     * @description [1-1] 사용자 내부 로그인
     */
    function login(param: IAuth.SignInParam): Promise<{ goPath: string }> {
      return new Promise(async (resolve, reject) => {
        state.loggedIn = true

        try {
          const { data, success } = await AuthService.signIn(param)

          if (success) {
            state.loggedIn = false
            state.loading = true
            const { accessToken, refreshToken } = data

            setToken(accessToken)
            setRefreshToken(refreshToken)

            const { userInfo, goPath, workspaceId, useDefaultWorkspace } = await afterLoginAction()

            setUser({
              ...userInfo,
              useDefaultWorkspace
            })

            workspaceId && setSelectedWorkspaceId(workspaceId)

            resolve({
              goPath
            })
          }
        } catch (error) {
          state.user = getDefaultUser()
          state.loggedIn = false
          state.loading = false
          reject(error)
        }
      })
    }

    /**
     * @description [1-2] 사용자 소셜 로그인
     */
    function loginSocial(): Promise<{ goPath: string }> {
      return new Promise(async (resolve, reject) => {
        try {
          const { userInfo, goPath, workspaceId, useDefaultWorkspace } = await afterLoginAction()

          setUser({
            ...userInfo,
            useDefaultWorkspace
          })

          workspaceId && setSelectedWorkspaceId(workspaceId)
          state.loggedIn = true

          resolve({
            goPath
          })
        } catch (error) {
          state.user = getDefaultUser()
          state.loggedIn = false

          reject(error)
        }
      })
    }

    /**
     * @description [2] 사용자 로그인 이후 처리
     */
    function afterLoginAction(): Promise<{
      userInfo: IAuth.UserResponse
      goPath: string
      workspaceId: string | null
      useDefaultWorkspace: boolean
    }> {
      return new Promise(async (resolve, reject) => {
        try {
          const userInfo = await getUserInfo()
          const { goPath, workspaceId, useDefaultWorkspace } = await workspaceAction(userInfo)

          resolve({
            userInfo,
            goPath,
            workspaceId,
            useDefaultWorkspace
          })
        } catch (error) {
          reject(error)
        }
      })
    }

    /**
     * @description [3] 사용자 정보 조회
     */
    function getUserInfo(): Promise<IAuth.UserResponse> {
      return AuthService.getUserInfo()
    }

    /**
     * @description [4] 사용자 워크스페이스 플로우
     */
    function workspaceAction(
      userInfo: IAuth.UserResponse
    ): Promise<{ goPath: string; workspaceId: string | null; useDefaultWorkspace: boolean }> {
      return new Promise(async (resolve, reject) => {
        try {
          let goPath = ''
          let useDefaultWorkspace = false
          let workspaceId = null
          const workspaceCount = userInfo.workspaceCount

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
            const { data, success } = await WorkspaceService.getWorkspaceList()

            if (success) {
              const { defaultWorkspace, defaultWorkspaceId, workspaceInfoList } = data
              useDefaultWorkspace = defaultWorkspace

              if (useDefaultWorkspace) {
                /************************************************************
                 * case: defaultWorkspace 설정한 경우
                 * - workspace 상세 조회 API 호출
                 * - 메인 화면으로 이동
                 ************************************************************/
                workspaceId = defaultWorkspaceId
                // setSelectedWorkspaceId(defaultWorkspaceId)
                goPath = PagePathEnum.BASE_HOME
              } else if (!useDefaultWorkspace && workspaceInfoList.length === 1) {
                /************************************************************
                 * case: defaultWorkspace 설정하지 않고 workspace 목록이 한개일 경우
                 * - workspace 상세 조회 API 호출
                 * - data.workspaceInfoList[0].workspaceId로 호풀
                 * - 메인 화면으로 이동
                 ************************************************************/
                workspaceId = workspaceInfoList[0].workspaceId
                // setSelectedWorkspaceId(workspaceInfoList[0].workspaceId)
                goPath = PagePathEnum.BASE_HOME
              } else if (!useDefaultWorkspace && workspaceInfoList.length > 1) {
                /************************************************************
                 * case: defaultWorkspace 설정하지 않고 workspace 목록이 여러개일 경우
                 * - workspace 목록 화면으로 이동
                 ************************************************************/
                goPath = PagePathEnum.WORKSPACE_LIST
              }
            }
          }

          resolve({
            goPath,
            workspaceId,
            useDefaultWorkspace
          })
        } catch (error) {
          reject(error)
        }
      })
    }

    async function logout(goLogin = true) {
      Util.Storage.clear()
      state.loggedIn = false
      state.token = ''
      state.user = getDefaultUser()
      setLocale(locales.browserLanguage)
      goLogin && router.push(PagePathEnum.BASE_LOGIN)
    }

    function setUser(values: Partial<IUser>) {
      state.user = {
        ...state.user,
        ...values
      }

      Util.Storage.set(USER_INFO_KEY, state.user)
    }

    function setToken(token: string) {
      state.token = token
      Util.Storage.set(ACCESS_TOKEN_KEY, token)
    }

    function setRefreshToken(token: string) {
      Util.Storage.set(REFRESH_TOKEN_KEY, token)
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
      getLoggedIn,
      getLoading,
      getUserInfo,
      afterLoginAction,
      login,
      logout,
      loginSocial,
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
