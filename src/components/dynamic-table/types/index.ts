import type { ComputedRef } from 'vue'
import type { IBaseAPI } from '@/services/base/interface'
import type { FilterFormItem, FilterList } from '@/components/filter-form'
import type { TableProps } from '@/components/table'

export interface DynamicTableProps extends TableProps {
  showToolbar?: boolean
  showFilter?: boolean
  filters?: FilterList
  openDetail: boolean
  // 테이블 필터 정보에 대한 API
  filterRequest?: () => Promise<API.ResponseData<IBaseAPI.FilterResponse>>
}

export interface DynamicTableEmits {}

export interface DynamicTablExposes {
  reload: (options: { isReset?: boolean }) => void
  getShowToolbar: () => ComputedRef<boolean>
}

export interface DynamicTableAction {
  setProps: (props: Partial<DynamicTableProps>) => void
  setContextValues: (value: Partial<DynamicTableContextValues>) => void
  getFilterFormItems: () => FilterFormItem[]
  setFilterFormItem: (filterFormItem: FilterFormItem) => void
  initFilterFormItems: () => void
  clearTag?: () => void
  clearSelectedItems: () => void
  closeFilter: () => void
  closeDetail: () => void
  getShowToolbar: () => ComputedRef<boolean>
  emitter: DynamicTableEmits
}

export interface DynamicTableContextValues {
  filterFormItems: FilterFormItem[]
  selectedRows: Recordable[]
}

export const defaultContenxtValues: DynamicTableContextValues = {
  filterFormItems: [],
  selectedRows: []
}

export type TableFilterList = FilterList
