import { authService, service } from '@/utils/http'
import type { IAuth } from './interface'

class AuthService {
  readonly PATH: string = '/workspace/v1.0/user'
  readonly AUTH_PATH: string = '/sign/v1.0'

  constructor() {}

  /**
   * @description 사용자 로그인 API
   */
  signIn(param: IAuth.SignInParam) {
    return authService.post<IAuth.SignInResponse>(this.AUTH_PATH + '/sign-in', param)
  }

  /**
   * @description 사용자 로그인(workspace) API
   */
  async loginWS(): Promise<IAuth.UserResponse> {
    return await service.get<IAuth.UserResponse>(this.PATH + '/me').then((response) => {
      const { success, data, error } = response

      if (success) {
        return data
      } else {
        return Promise.reject(error)
      }
    })
  }

  /**
   * @description 사용자 로그아웃 API
   */
  logout() {
    return service.delete(this.PATH + '/sign-out')
  }

  /**
   * @description 사용자 회원가입 API
   */
  signUp(param: IAuth.SignUpParam) {
    return authService.post<IAuth.SignUpResponse>(this.AUTH_PATH + '/sign-up', param)
  }
}

export default new AuthService()
