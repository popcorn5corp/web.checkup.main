import { service } from '@/utils/http'
import type { IAuth } from './interface'

class AuthService {
  readonly PATH: string = '/workspace/v1.0/user'

  constructor() {}

  getUser() {
    return service.get<IAuth.UserResponse>(this.PATH + '/me')
  }

  signOut() {
    return service.delete(this.PATH + '/sign-out')
  }
}

export default new AuthService()
