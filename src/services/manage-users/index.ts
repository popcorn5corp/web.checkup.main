import { service } from '@/utils/http'
import type { IManageUser } from './interface'

class ManageUserService {
  private readonly PATH = '/workspace/v1.0/management/workspaces'

  constructor() {}

  // 사용자 목록 조회
  getUserList(param: IManageUser.UserListParam, workspaceId: string) {
    return service.get<IManageUser.UserListRequest>(this.PATH + `/${workspaceId}/users`, param)
  }

  // 사용자 초대 이메일 중복 확인
  checkDuplicatedEmail(param: IManageUser.DuplicatedEmailParam, workspaceId: string) {
    return service.get<IManageUser.DuplicatedEmailResponse>(
      this.PATH + `${workspaceId}/user/exist`,
      param
    )
  }

  // 사용자 초대
  inviteUsers(param: IManageUser.InviteUsersParam, workspaceId: string) {
    return service.post(this.PATH + `/${workspaceId}/users/invite`, param)
  }
}

export default new ManageUserService()
