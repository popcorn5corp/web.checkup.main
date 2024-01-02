import type { FilterList } from '@/components/filter-form/types'

export namespace IBaseAPI {
  export interface FilterResponse {
    filters: FilterList
  }
}
