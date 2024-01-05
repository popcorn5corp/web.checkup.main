import { service } from '@/utils/http'
import type { SortCodesResponse } from '../base-sample/interface'
import type { IBaseAPI } from '../base/interface'
import type { IManageUser } from './interface'

class ManageUserService {
  private readonly PATH = '/workspace/v1.0/management/workspaces'

  constructor() {}

  // 사용자 목록 조회
  getUserList(workspaceId: string, param?: IManageUser.UserListParam) {
    return service.get<IManageUser.UserListRequest>(this.PATH + `/${workspaceId}/users`, param)
  }

  // 사용자 테이블 sort
  getSortableCodes() {
    return service.get<SortCodesResponse>(this.PATH + '/users/sortable-codes')
  }

  // 사용자 테이블 filter
  getPageInfo() {
    return service.get<IBaseAPI.FilterResponse>(this.PATH + '/users/filters')
  }

  // 사용자 목록 상세 조회

  getOneById(workspaceId: string, workspaceUserId: string) {
    // TODO response 변경 예정
    return service.get<IManageUser.GetDetailResponse>(
      this.PATH + `/${workspaceId}/user/${workspaceUserId}`
    )
  }

  // 사용자 초대 이메일 중복 확인
  checkDuplicatedEmail(workspaceId: string, param: IManageUser.DuplicatedEmailParam) {
    return service.get<IManageUser.DuplicatedEmailResponse>(
      this.PATH + `/${workspaceId}/user/exist`,
      param
    )
  }

  // 사용자 초대
  inviteUsers(workspaceId: string, param: IManageUser.InviteUsersParam) {
    return service.post(this.PATH + `/${workspaceId}/users/invite`, param)
  }
}

export default new ManageUserService()
