import { service } from '@/utils/http'
import type { IWorkspace } from './interface'

class WorkspaceService {
  private readonly PATH = '/workspace/v1.0'

  constructor() {}

  getUser() {
    return service.get<IWorkspace.UserMeResponseData>(this.PATH + '/user/me')
  }

  checkDuplicatedEmail(param: IWorkspace.ExistEmailParam) {
    return service.get<IWorkspace.ExistEmailResponse>(this.PATH + '/exist', param)
  }

  createWorkspace(param: IWorkspace.WorkspaceCreateParam) {
    return service.post<IWorkspace.WorkspaceCreateResponse>(this.PATH + '/workspaces', param)
  }
}

export default new WorkspaceService()
