import { service } from '@/utils/http'
import type { SortCodesResponse } from '../base-sample/interface'
import type { IBaseAPI } from '../base/interface'
import type { IManageGroup } from './interface'

class ManageGroupService {
  private readonly PATH = '/workspace/v1.0/management'

  constructor() {}

  /**
   * @description 그룹 리스트 조회
   * @returns 그룹 리스트 목록
   */
  getGroupList(workspaceId: string, param: IManageGroup.GroupListParam) {
    return service.get(this.PATH + `/${workspaceId}/group/posts`, param)
  }

  /**
   * @description 그룹 리스트 정렬 코드 조회
   * @returns 정렬 가능 여부, 요청시 sort 필드명
   */
  getSortableCodes() {
    return service.get<SortCodesResponse>(this.PATH + '/group/posts/sortable-codes')
  }

  /**
   * @description 그룹 리스트 필터 조회
   * @returns 그룹 리스트 필터 데이터
   */
  getPageInfo() {
    return service.get<IBaseAPI.FilterResponse>(this.PATH + '/group/posts/filters')
  }

  /**
   * @description 그룹 상세보기 조회
   * @returns 그룹 유저 데이터
   */
  getGroupDetail(groupId: string) {
    return service.get<IManageGroup.Content>(this.PATH + `/group/${groupId}/users`)
  }

  /**
   * @description 그룹 타임라인 조회
   * @returns 그룹 타임라인 데이터
   */
  getGroupHistory(groupId: string, param: any) {
    return service.get<IManageGroup.HistoryResponse>(this.PATH + `/group/${groupId}/logs`, param)
  }

  /**
   * @description 워크스페이스 사용자 조회
   * @returns 워크스페이스 사용자 데이터
   */
  getWorkspaceUserList(
    workspaceId: string,
    groupId: string,
    param: Partial<IManageGroup.GroupListParam>
  ) {
    return service.get<IManageGroup.Content[]>(
      this.PATH + `/workspace/${workspaceId}/${groupId}/users`,
      param
    )
  }

  /**
   * @description 그룹 등록
   */
  createGroup(requestBody: IManageGroup.GroupRequest) {
    return service.post<IManageGroup.GroupRequest>(this.PATH + `/group`, requestBody)
  }

  /**
   * @description 그룹 사용자 추가
   */
  addUserWithGroup(groupId: string, requestBody: Partial<IManageGroup.GroupRequest>) {
    return service.post<IManageGroup.GroupRequest>(
      this.PATH + `/group/${groupId}/users`,
      requestBody
    )
  }

  /**
   * @description 그룹 사용자 삭제
   */
  removeUserWithGroup(groupId: string, uid: string) {
    return service.delete(this.PATH + `/group/${groupId}/user`, { uid })
  }

  /**
   * @description 그룹 사용자 삭제
   */
  removeGroup(workspaceId: string, param: string[]) {
    console.log(param)
    return service.delete(this.PATH + `/${workspaceId}/group`, { groupId: param })
  }
}

export default new ManageGroupService()
