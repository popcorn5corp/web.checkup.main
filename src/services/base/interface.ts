import type { IFilter } from '@/components/filter-form/types'

export namespace IBaseAPI {
  export interface FilterResponse {
    filters: IFilter[]
  }
}
