import { defineStore } from 'pinia'
import { Storage } from '@/utils/storage'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/enums/cacheKeyEnum'
import type { TokenKey } from '../interface'

export const useAuthStore = defineStore('auth', () => {
  function setToken(tokenKey: TokenKey, token: string) {
    Storage.set(tokenKey, token)
  }

  function getToken(tokenKey: TokenKey) {
    return Storage.get<string>(tokenKey)
  }

  function removeToken() {
    Storage.remove(ACCESS_TOKEN_KEY)
    Storage.remove(REFRESH_TOKEN_KEY)
  }

  return {
    setToken,
    getToken,
    removeToken
  }
})
