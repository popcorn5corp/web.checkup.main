import type { IFilter } from '@/components/filter-form/types'

export interface ConditionParam {
  sort?: string
  filter?: string
}
export namespace IManageGroup {
  export interface ResponseTable
    extends API.ResponseData<{ posts: ResPagiInfo<ResTableContent[]> }> {}

  export interface ResponseUserList
    extends API.ResponseData<{ posts: ResPagiInfo<ResUserContent[]> }> {}

  export interface ResponseHistory
    extends API.ResponseData<{ posts: ResPagiInfo<ResHistoryContent[]> }> {}

  export interface PageableInfo {
    sort: SortInfo
    pageNumber: number
    pageSize: number
    offset: number
    paged: boolean
    unpaged: boolean
  }

  export interface ResPagiInfo<T> {
    content: T
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

  export interface ResTableContent {
    content: string
    createdAt: number
    groupId: string
    index: number
    name: string
    rowKey: string
    status: LabelValue<string>
    url: string
  }

  export interface ResUserContent extends DefaultUserInfo {
    email: string
    status: LabelValue<string>
    thumbnail: BoardFile | null
  }

  export interface ResHistoryContent {
    issuedDate: string
    logs: LogItem[]
  }

  export interface DefaultGroupInfo {
    workspaceId: string
    name: string
    content: string
    url: string
    addUsers: DefaultUserInfo[]
  }

  export interface DefaultUserInfo {
    uid: string
    nickname: string
  }

  export interface SortInfo {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }

  export interface GroupListParam extends ConditionParam {
    searchWord: string
    searchStatus: string
  }

  export interface BoardFile {
    name: string
    originName: string
    url: string // domain + path
    path: string
    ext: string
    size: number
  }

  export interface LogItem {
    logId: string
    uid: string
    nickname: string
    createTime: string
    status: LabelValue<string>
  }

  export interface FilterResponse {
    filters: IFilter[]
  }
}
