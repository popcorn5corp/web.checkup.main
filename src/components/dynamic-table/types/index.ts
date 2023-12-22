import type { IBaseAPI } from '@/services/base/interface'
import type { FilterFormItem, FilterList } from '@/components/filter-form'
import type { TableProps } from '@/components/table'

export interface DynamicTableProps extends TableProps {
  // 필터 목록 (filterRequest 대체 가능)
  filters?: FilterList
  // 상세 영역 표출
  openDetail?: boolean
  // 필터 버튼 노출 여부
  showFilter?: boolean
  // 등록 버튼 노출 여부
  showRegist?: boolean
  // 다운로드 버튼 노출 여부
  showDownload?: boolean
  // 테이블 필터 정보에 대한 API
  filterRequest?: () => Promise<API.ResponseData<IBaseAPI.FilterResponse>>
  /**
   * Request API에 대한 응답 Content 처리를 위한 Callback
   * @param content
   */
  contentCallback?: (content: any) => Array<Record<string, any>>
  /**
   * Request API에 대한 응답 CardView 정보 대응을 위한 Content 처리 Callback
   * @param content
   */
  cardContentCallback?: (content: any) => Array<Record<string, any>>
}

export interface DynamicTableEmits {}

export interface DynamicTableExposes {
  reload: (options: { isReset?: boolean }) => void
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
