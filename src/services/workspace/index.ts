import { service } from '@/utils/http'
import type { IWorkspace } from './interface'

class WorkspaceService {
  private readonly PATH = '/workspace/v1.0'

  constructor() {}

  // 팀원 초대 이메일 중복 확인
  checkDuplicatedEmail(param: IWorkspace.ExistEmailParam) {
    return service.get<IWorkspace.ExistEmailResponse>(this.PATH + '/exist', param)
  }

  // 워크스페이스 생성
  createWorkspace(param: IWorkspace.CreateWorkspaceParam) {
    return service.post<IWorkspace.CreateWorkspaceResponse>(this.PATH + '/workspaces', param)
  }

  // 초대코드 유효성 체크
  checkInviteCode(param: IWorkspace.ValidateInviteCodeParam) {
    return service.get<IWorkspace.ValidateInviteCodeResponse>(
      this.PATH + '/workspace/invite/check',
      param
    )
  }

  // 워크스페이스 가입
  joinWorkspace(param: IWorkspace.JoinWorkspaceParam) {
    return service.post<IWorkspace.JoinWorkspaceResponse>(this.PATH + `/workspace/join`, param)
  }

  // 워크스페이스 가입 정보 조회
  getWorkspaceInformation(workspaceId: string) {
    return service.post<IWorkspace.GetWorkspaceInfoResponse>(
      this.PATH + `/workspace/join/${workspaceId}`
    )
  }
}

export default new WorkspaceService()
