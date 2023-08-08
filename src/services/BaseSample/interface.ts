// export interface IBaseSampleService {
//   getAll: (param: IBaseSample.BaseSamplesParam) => Promise<IBaseSample.BaseSamples>
//   getOneById: (id: string) => Promise<IBaseSample.BaseSample>
//   updateOne: (param: IBaseSample.BaseSampleUpdateParam) => Promise<IBaseSample.BaseSample>
//   createOne: (param: IBaseSample.BaseSampleCreateParam) => Promise<IBaseSample.Content>
//   deleteOne: (id: string) => Promise<any>
//   getSortableCodes: () => Promise<SortCodesResponse>
//   fileDwonload: () => Promise<any>
// }

import type { Dayjs } from "dayjs";

export interface ConditionParam {
  sort?: string;
  filter?: string;
}

export interface SortCodesResponse {
  isSortable: boolean;
  enabledSortCodes: Array<{
    sortCode: string;
    description: string;
  }>
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
    key: Key;
    boardId: string // 샘플 게시판 아이디
    boardTitle: string // 샘플 게시판 제목
    boardContent: string // 샘플 게시판 내용
    createdAt: string | Dayjs // 생성일
    division: 'PRIVATE' | 'PUBLIC' // 샘플 게시판 구분
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

  export interface BaseSample extends Content {
    boardFiles: Array<{
      extension: string
      fileId: string
      fileOriginName: string
      fileUrl: string
      size: number
    }>
  }

  export interface BaseSamplesParam extends ConditionParam{
    searchEndDate: string
    searchStartDate: string
    searchWord: string
    size: number
    page: number
    division: 'PRIVATE' | 'PUBLIC'
  }

  export interface BaseSampleUpdateParam extends BaseSample {}
  export interface BaseSampleCreateParam extends Omit<BaseSample, 'boardId'>
}
