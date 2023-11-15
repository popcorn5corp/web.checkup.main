import { service } from '@/utils/http'
import type { IWorkspace } from './interface'

class WorkspaceService {
  private readonly PATH = '/workspace/v1.0'

  constructor() {}

  getUser() {
    return service.get<IWorkspace.UserMeResponseData>(this.PATH + '/user/me')
  }

  isExistEmail(param: IWorkspace.ExistEmailParam) {
    // TODO 타입 아직 미정
    return service.get<IWorkspace.ExistEmailResponse>(this.PATH + '/exist', param)
  }

  createWorkspace(param: IWorkspace.WorkspaceCreateParam) {
    return service.post<IWorkspace.WorkspaceCreateResponse>(this.PATH + '/workspaces', param)
  }
}

export default new WorkspaceService()
