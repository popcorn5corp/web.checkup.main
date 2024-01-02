import type { IFilter } from '@/components/filter-form/types'

export interface ConditionParam {
  sort?: string
  filter?: string
}
export namespace IManageUser {
  export interface SortInfo {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }

  export interface UserListParam extends ConditionParam {
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
    userStatus: {
      label: string
      value: string
    }
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

  export interface UserListRequest {
    workspaceUsers: {
      content: UserInfo[]
      pageable: PageableInfo[]
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
  }

  export interface FilterResponse {
    filters: IFilter[]
  }

  export interface GroupData {
    groupId: string
    name: string
    url: string
  }

  export interface GetDetailResponse {
    detail: {
      joinDate: string
      gender: {
        label: string
        value: string
      }
    }
    groups: GroupData[]
  }

  export interface DuplicatedEmailParam {
    inviteEmail: string
  }
  export interface DuplicatedEmailResponse {
    inviteEmail: string
    exist: boolean
  }

  export interface InviteUsersParam {
    inviteEmails: string[]
  }
}
