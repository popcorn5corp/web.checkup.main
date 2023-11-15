import { service } from '@/utils/http'
import type { WorkspaceManager } from './interface'

class WorkspaceManagerService {
  private readonly PATH = '/workspace/v1.0'

  constructor() {}

  getUser() {
    return service.get(this.PATH + '/user/me')
  }

  create(formData: WorkspaceManager.WorkspaceData) {
    return service.post(this.PATH + '/workspace', formData)
  }
}

export default new WorkspaceManagerService()
