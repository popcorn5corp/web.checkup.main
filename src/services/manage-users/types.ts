import type { IFilter } from '@/components/filter-form/types'

export interface ConditionParam {
  sort?: string
  filter?: string
}
export namespace IManageUser {
  export interface GetTimelineResponse extends ResponseData<TimelineInfo[]> {}
  export interface SortInfo {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }

  export interface GetUserListParam extends ConditionParam {
    searchWord: string
    searchUserStatus: string
    size: number
    page: number
  }

  export interface UserInfo {
    workspaceUserId: string
    nickname: string
    email: string
    phone: string
    joinDate: string
    userStatus: LabelValue<string>
    thumbnail: {
      url: string
    }
  }

  export interface PageableInfo {
    sort: SortInfo
    pageNumber: number
    pageSize: number
    offset: number
    paged: boolean
    unpaged: boolean
  }

  export interface PageableResponse<T> {
    content: T
    pageable: PageableInfo
    last: boolean
    totalPages: number
    totalElements: number
    sort: SortInfo
    first: boolean
    number: number
    numberOfElements: number
    size: number
    empty: boolean
  }

  export interface ResponseData<T> {
    posts: PageableResponse<T>
  }

  export interface GetUserListRequest {
    workspaceUsers: PageableResponse<UserInfo[]>
  }

  export interface FilterResponse {
    filters: IFilter[]
  }

  export interface GroupData {
    groupId: string
    name: string
    url: string | null
  }

  export interface GetDetailResponse {
    detail: UserInfo
    groups: GroupData[]
  }

  export interface LogItem {
    logId: string
    uid: string
    nickname: string
    targetUid: string
    targetNickName: string
    createTime: string
    status: LabelValue<string>
  }

  export interface TimelineInfo {
    issuedDate: string
    logs: LogItem[]
  }

  export interface GetTimelineParam {
    page?: number
    size: number
  }

  export interface UpdateUserParam {
    userStatus: string
  }

  export interface GetDuplicatedEmailParam {
    inviteEmail: string
  }
  export interface GetDuplicatedEmailResponse {
    inviteEmail: string
    exist: boolean
  }

  export interface InviteUsersParam {
    inviteEmails: string[]
  }
}
