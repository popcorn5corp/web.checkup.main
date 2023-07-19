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

  interface Content {
    boardId: string
    boardTitle: string
    boardContent: string
    createdAt: string
    division: string
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
