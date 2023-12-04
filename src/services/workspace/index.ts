import { service } from '@/utils/http'
import type { IWorkspace } from './interface'

class WorkspaceService {
  private readonly PATH = '/workspace/v1.0'

  constructor() {}

  // 워크스페이스 목록 조회
  getWorkspaceList() {
    return service.get<IWorkspace.WorkspaceListResponse>(this.PATH + '/user/workspaces')
  }

  // 기본 워크스페이스 설정
  setDefaultWorkspace(param: IWorkspace.DefaultWorkspceInfo) {
    return service.post(this.PATH + '/user/workspaces/default-workspace', param)
  }

  // 기본 이미지 조회
  getDefaultProfiles() {
    return service.get<IWorkspace.DefaultProfilesResponse>(this.PATH + '/images/default-profiles')
  }

  // 팀원 초대 이메일 중복 확인
  checkDuplicatedEmail(param: IWorkspace.ExistEmailParam) {
    return service.get<IWorkspace.ExistEmailResponse>(this.PATH + '/exist', param)
  }

  // 업종 조회
  getBusinessType() {
    return service.get<IWorkspace.BusinessOptResponse>(
      this.PATH + '/workspace/join/business-type-codes'
    )
  }

  // 규모 조회
  getEmployeeScale() {
    return service.get<IWorkspace.BusinessOptResponse>(
      this.PATH + '/workspace/join/employee-scale-codes'
    )
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
    return service.get<IWorkspace.GetWorkspaceInfoResponse>(
      this.PATH + `/workspace/join/${workspaceId}`
    )
  }
}

export default new WorkspaceService()
