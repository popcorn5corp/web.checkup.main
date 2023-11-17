import { Util } from '@/utils'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import type { IAuth } from '@/services/auth/interface'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/cacheKeyEnum'
import type { TokenKey } from '../interface'

export type IUser = IAuth.UserResponse & {
  accessToken: string
}
interface AuthState {
  user: IUser
}

export const useAuthStore = defineStore('auth', () => {
  const state = reactive<AuthState>({
    user: {
      uid: '',
      userId: '',
      userName: '',
      workspaceCount: 0,
      workspaceInfoList: [],
      accessToken: ''
    }
  })

  const getUser = computed(() => state.user)

  function setUser(param: IAuth.UserResponse) {
    state.user = {
      ...state.user,
      ...param
    }
  }

  function setToken(tokenKey: TokenKey, token: string) {
    Util.Storage.set(tokenKey, token)
    state.user.accessToken = token
  }

  function getToken(tokenKey: TokenKey) {
    return Util.Storage.get<string>(tokenKey)
  }

  function removeToken() {
    Util.Storage.remove(ACCESS_TOKEN_KEY)
    Util.Storage.remove(REFRESH_TOKEN_KEY)
  }

  return {
    getUser,
    setUser,
    setToken,
    getToken,
    removeToken
  }
})
