import type { IAuth } from '@/services/auth/types'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/cacheKeyEnum'

export type IUser = IAuth.UserResponse & { useDefaultWorkspace: boolean }

export interface SocialType {
  type: 'google' | 'naver' | 'kakao'
  url: string
  icon: string
}

export interface AuthState {
  user: IUser
  loggedIn: boolean
  token: string
  loading: boolean
}

export type TokenKey = typeof ACCESS_TOKEN_KEY | typeof REFRESH_TOKEN_KEY
