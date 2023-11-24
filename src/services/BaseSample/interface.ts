// export interface IBaseSampleService {
//   getAll: (param: IBaseSample.BaseSamplesParam) => Promise<IBaseSample.BaseSamples>
//   getOneById: (id: string) => Promise<IBaseSample.BaseSample>
//   updateOne: (param: IBaseSample.BaseSampleUpdateParam) => Promise<IBaseSample.BaseSample>
//   createOne: (param: IBaseSample.BaseSampleCreateParam) => Promise<IBaseSample.Content>
//   deleteOne: (id: string) => Promise<any>
//   getSortableCodes: () => Promise<SortCodesResponse>
//   fileDwonload: () => Promise<any>
// }
export interface ConditionParam {
  sort?: string
  filter?: string
}

export interface SortCodesResponse {
  isSortable: boolean
  enabledSortCodes: Array<{
    sortCode: string
    description: string
  }>
}

export interface ICode<T = any> {
  label: string
  value: LabelValue<T>
}

export interface CodeResponse {
  codes: ICode[]
}

export type PermissionCodes = ICode[]

export namespace IBaseSample {
  interface SortCode {
    sortCode: string
    description: string
  }

  interface SortInfo {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }

  export interface Content {
    // key: Key
    boardId: string // 샘플 게시판 아이디
    boardTitle: string // 샘플 게시판 제목
    boardContent: string // 샘플 게시판 내용
    createdAt: number // 생성일
    thumbnail: BoardFile | null
    permission: ICode<'GUEST' | 'NORMAL' | 'ADMIN'>
    division: ICode<'PRIVATE' | 'PUBLIC'> // 샘플 게시판 구분
  }

  export interface BaseSamples {
    enabledSortCodes: SortCode[]
    posts: {
      content: Content[]
      empty: boolean
      first: boolean
      last: boolean
      number: number
      numberOfElements: number
      pageable: {
        offset: number
        pageNumber: number
        pageSize: number
        paged: boolean
        sort: SortInfo
        unpaged: boolean
      }
      size: number
      sort: SortInfo
      totalElements: number
      totalPages: number
    }
  }

  export interface BoardFile {
    ext: string
    fileId: string
    name: string
    originName: string
    path: string
    size: number
    url: string // domain + path
  }

  export interface BaseSample extends Content {
    boardFiles: BoardFile[]
  }

  export interface BaseSamplesParam extends ConditionParam {
    searchEndDate: string
    searchStartDate: string
    searchWord: string
    size: number
    page: number
    searchDivision: 'PRIVATE' | 'PUBLIC' | ''
    searchPermission: 'GUEST' | 'NORMAL' | 'ADMIN' | ''
  }

  export interface BaseSampleUpdateParam extends Omit<BaseSample, 'createdAt' | 'thumbnail'> {}
  export interface BaseSampleCreateParam
    extends Omit<BaseSample, 'boardId' | 'createdAt' | 'thumbnail'> {}
}
