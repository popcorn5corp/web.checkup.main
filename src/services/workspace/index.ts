import { service } from '@/utils/http'
import type { IWorkspace } from './interface'

class WorkspaceService {
  private readonly PATH = '/workspace/v1.0'

  constructor() {}

  /**
   * @description 워크스페이스 목록 조회 API
   */
  getWorkspaceList(param?: IWorkspace.WorkspaceListParam) {
    return service.get<IWorkspace.WorkspaceListResponse>(this.PATH + '/user/workspaces', param)
  }

  /**
   * @description 기본 워크스페이스 설정 API
   */
  updateDefaultWorkspace(param: IWorkspace.DefaultWorkspceInfo) {
    return service.post(this.PATH + '/user/workspaces/default-workspace', param)
  }

  /**
   * @description 기본 이미지 조회 API
   */
  getDefaultProfiles() {
    return service.get<IWorkspace.DefaultProfilesResponse>(this.PATH + '/images/default-profiles')
  }

  /**
   * @description 업종 조회 API
   */
  getBusinessType() {
    return service.get<IWorkspace.BusinessOptResponse>(
      this.PATH + '/workspace/join/business-type-codes'
    )
  }

  /**
   * @description 규모 조회 API
   */
  getEmployeeScale() {
    return service.get<IWorkspace.BusinessOptResponse>(
      this.PATH + '/workspace/join/employee-scale-codes'
    )
  }

  /**
   * @description 워크스페이스 생성 API
   */
  createWorkspace(param: IWorkspace.CreateWorkspaceParam) {
    return service.post<IWorkspace.CreateWorkspaceResponse>(this.PATH + '/workspaces', param)
  }

  /**
   * @description 초대코드 유효성 체크 API
   */
  checkInviteCode(param: IWorkspace.ValidateInviteCodeParam) {
    return service.get<IWorkspace.ValidateInviteCodeResponse>(
      this.PATH + '/workspace/invite/check',
      param
    )
  }

  /**
   * @description 워크스페이스 가입 API
   */
  joinWorkspace(param: IWorkspace.JoinWorkspaceParam) {
    return service.post<IWorkspace.JoinWorkspaceResponse>(this.PATH + `/workspace/join`, param)
  }

  /**
   * @description 워크스페이스 가입 정보 조회 API
   */
  getWorkspaceInformation(workspaceId: string) {
    return service.get<IWorkspace.GetWorkspaceInfoResponse>(
      this.PATH + `/workspace/join/${workspaceId}`
    )
  }

  /**
   * @description 워크스페이스 상세 정보 조회 API
   */
  getUserWorkspace(workspaceId: string) {
    return service.get<IWorkspace.UserWorkspaceResponse>(
      this.PATH + `/workspaces/${workspaceId}/me`
    )
  }
}

export default new WorkspaceService()
