import { service } from '@/utils/http'
import type { IAuth } from './interface'

class AuthService {
  readonly PATH: string = '/workspace/v1.0/user'

  constructor() {}

  async login(): Promise<IAuth.UserResponse> {
    return await service.get<IAuth.UserResponse>(this.PATH + '/me').then((response) => {
      const { success, data, error } = response

      if (success) {
        return data
      } else {
        return Promise.reject(error)
      }
    })
  }

  logout() {
    return service.delete(this.PATH + '/sign-out')
  }
}

export default new AuthService()
