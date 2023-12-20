import type { IFilter } from '@/components/filter-form/types'

export interface ConditionParam {
  sort?: string
  filter?: string
}
export namespace IManageGroup {
  export interface SortInfo {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }

  export interface GroupListParam extends ConditionParam {
    searchWord: string
    searchStatus: string
  }

  export interface PageableInfo {
    sort: SortInfo
    pageNumber: number
    pageSize: number
    offset: number
    paged: boolean
    unpaged: boolean
  }

  export interface DefaultUserInfo {
    uid: string
    nickname: string
  }

  export interface GroupTableRowInfo {
    content: string
    createdAt: number
    groupId: string
    name: string
    status: statusInfo
    url: string
  }
  export interface GroupTableResponse {
    posts: {
      content: GroupTableRowInfo[]
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

  export interface GroupRequest extends DefaultUserInfo {
    workspaceId: string
    name: string
    content: string
    url: string
    addUsers: DefaultUserInfo[]
  }

  export interface statusInfo {
    label: string
    value: string
  }

  export interface BoardFile {
    name: string
    originName: string
    url: string // domain + path
    path: string
    ext: string
    size: number
  }

  export interface Content {
    groupId: string
    uid: string
    nickname: string
    email: string
    status: statusInfo
    thumbnail: BoardFile | null
  }

  export interface BaseSample extends Content {
    boardFiles: BoardFile[]
  }

  export interface FilterResponse {
    filters: IFilter[]
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
