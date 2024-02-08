import { authService, service } from '@/utils/http'
import type { IAuth } from './types'

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
  async getUser(): Promise<IAuth.UserResponse> {
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

  /**
   * @description 사용자 아이디 찾기 API
   */
  findId(param: IAuth.FindType) {
    return authService.post<IAuth.FindIdResponse>(this.AUTH_PATH + '/users/find-id', param)
  }

  /**
   * @description 사용자 비밀번호 찾기 API
   */
  findPassword(param: IAuth.FindPasswordParam) {
    return authService.post<IAuth.UidType>(this.AUTH_PATH + '/users/find-password', param)
  }

  /**
   * @description 사용자 비밀번호 리셋 API
   */
  resetPassword(param: IAuth.ResetPasswordParam) {
    return authService.post<IAuth.UidType>(this.AUTH_PATH + '/users/reset-password', param)
  }

  /**
   * @description 사용자 이메일 인증번호 전송 API
   */
  sendEmail(param: IAuth.SendEmailParam) {
    return authService.post<IAuth.SendEmailResponse>(this.AUTH_PATH + '/users/auth/email', param)
  }

  /**
   * @description 사용자 이메일 인증번호 확인 API
   */
  validEmail(param: IAuth.ValidEmailParam) {
    return authService.post<IAuth.ValidResponse>(this.AUTH_PATH + '/users/auth/email/valid', param)
  }

  /**
   * @description 사용자 휴대폰 인증번호 전송 API
   */
  sendPhone(param: IAuth.SendPhoneParam) {
    return authService.post<IAuth.SendEmailResponse>(this.AUTH_PATH + '/users/auth/phone', param)
  }

  /**
   * @description 사용자 휴대폰 인증번호 전송 API
   */
  validPhone(param: IAuth.ValidPhoneParam) {
    return authService.post<IAuth.ValidResponse>(this.AUTH_PATH + '/users/auth/phone/valid', param)
  }
}

export default new AuthService()
