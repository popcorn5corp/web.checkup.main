export interface IBaseSampleService {
  getAll: () => Promise<IBaseSample.IBaseSamples>
  getOneById?: (id: number) => IBaseSample.Content
  createPost?: () => IBaseSample.Content
}

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
    boardId: string // 샘플 게시판 아이디
    boardTitle: string // 샘플 게시판 제목
    boardContent: string // 샘플 게시판 내용
    createdAt: string // 생성일
    division: 'PRIVATE' | 'PUBLIC' // 샘플 게시판 구분
  }

  export interface IBaseSamples {
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

  export interface ResGetBaseSample {
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
}
