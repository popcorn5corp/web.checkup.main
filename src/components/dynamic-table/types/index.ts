import type { ComputedRef } from 'vue'
import type { IBaseAPI } from '@/services/base/interface'
import type { FilterFormItem, FilterList } from '@/components/filter-form'
import type { TableProps } from '@/components/table'

export interface DynamicTableProps extends TableProps {
  // 필터 목록 (filterRequest 대체 가능)
  filters?: FilterList
  // 테이블 필터 정보에 대한 API
  filterRequest?: () => Promise<API.ResponseData<IBaseAPI.FilterResponse>>
  // 상세 영역 표출
  openDetail: boolean
  // 테이블 툴바 노출 여부
  showToolbar?: boolean
  // 필터 버튼 노출 여부
  showFilter?: boolean
  // 등록 버튼 노출 여부
  showRegist?: boolean
  // 다운로드 버튼 노출 여부
  showDownload?: boolean
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
  activeFilter: boolean
}

export const defaultContenxtValues: DynamicTableContextValues = {
  filterFormItems: [],
  selectedRows: [],
  activeFilter: false
}

export type TableFilterList = FilterList
