export namespace IManageUser {
  export interface SortInfo {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  export interface UserListParam {
    searchWord: string
  }

  export interface UserInfo {
    workspaceUserId: string
    userName: string
    email: string
    phone: string
    joinDate: string
    userStatus: {
      label: string
      value: string
    }
    thumbnail: ThumbnailInfo
  }

  export interface ThumbnailInfo {
    fileId: string
    name: string
    originName: string
    url: string
    path: string
    ext: string
    size: number
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

  export interface DuplicatedEmailParam {
    inviteEmail: string
  }
  export interface DuplicatedEmailResponse {
    inviteEmail: string
    isExist: boolean
  }

  export interface InviteUsersParam {
    inviteEmails: string[]
  }
}
