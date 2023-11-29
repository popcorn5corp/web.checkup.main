import { AuthService } from '@/services'
import { Util } from '@/utils'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import type { IAuth } from '@/services/auth/interface'
import type { IWorkspace } from '@/services/workspace/interface'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/cacheKeyEnum'
import type { TokenKey } from '../interface'

export type IUser = IAuth.UserResponse

interface AuthState {
  user: IUser
  loggedIn: boolean
}

function getDefaultUser() {
  return {
    uid: '',
    userId: '',
    userName: '',
    workspaceCount: 0,
    workspaceInfoList: []
  }
}

export const useAuthStore = defineStore('auth', () => {
  const state = reactive<AuthState>({
    user: Util.Storage.get<IUser>('user') || getDefaultUser(),
    loggedIn: false
  })

  const getUser = computed(() => state.user)

  function login() {
    return AuthService.login().then(
      (user) => {
        state.user = user
        state.loggedIn = true
        Util.Storage.set('user', state.user)
        return Promise.resolve(user)
      },
      (error) => {
        state.user = getDefaultUser()
        state.loggedIn = false
        return Promise.reject(error)
      }
    )
  }

  function logout() {
    removeToken()
    removeUser()
    state.loggedIn = false
    state.user = getDefaultUser()
  }

  // function setUser(param: IAuth.UserResponse) {
  //   state.user = {
  //     ...state.user,
  //     ...param
  //   }
  //   Util.Storage.set('user', state.user)
  // }

  function setToken(tokenKey: TokenKey, token: string) {
    Util.Storage.set(tokenKey, token)
  }

  function setWorkspaceList(workspace: IWorkspace.WorkspaceInfo) {
    state.user.workspaceInfoList.push(workspace)
  }

  function getToken(tokenKey: TokenKey) {
    return Util.Storage.get<string>(tokenKey)
  }

  function removeToken() {
    Util.Storage.remove(ACCESS_TOKEN_KEY)
    Util.Storage.remove(REFRESH_TOKEN_KEY)
  }

  function removeUser() {
    Util.Storage.remove('user')
  }

  return {
    getUser,
    login,
    logout,
    setToken,
    getToken,
    removeToken,
    removeUser,
    setWorkspaceList
  }
})
