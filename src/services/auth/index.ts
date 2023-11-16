import { service } from '@/utils/http'

class AuthService {
  readonly PATH: string = '/api'

  constructor() {}

  signOut() {
    return service.delete(this.PATH + '/sign-out')
  }
}

export default new AuthService()
