import { Util } from '@/utils'
import { defineStore } from 'pinia'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/cacheKeyEnum'
import type { TokenKey } from '../interface'

export const useAuthStore = defineStore('auth', () => {
  function setToken(tokenKey: TokenKey, token: string) {
    Util.Storage.set(tokenKey, token)
  }

  function getToken(tokenKey: TokenKey) {
    return Util.Storage.get<string>(tokenKey)
  }

  function removeToken() {
    Util.Storage.remove(ACCESS_TOKEN_KEY)
    Util.Storage.remove(REFRESH_TOKEN_KEY)
  }

  return {
    setToken,
    getToken,
    removeToken
  }
})
