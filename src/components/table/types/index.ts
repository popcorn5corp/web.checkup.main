import type { TableProps as ATableProps, TableColumnType } from 'ant-design-vue'
import type { DefaultRecordType } from 'ant-design-vue/lib/vc-table/interface'
import type { SortCodesResponse } from '@/services/base-sample/interface'

type PaginationPositon =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'

export type TableSize = 'small' | 'middle' | 'large'
export type CardSize = 'middle' | 'large'
export type SizeType = TableSize | CardSize

export interface TablePagination {
  total: number
  current: number
  pageSize: number
  showSizeChanger: boolean
  position: [PaginationPositon]
  pageSizeOptions: string[]
}

export interface TableSorter {
  column: {
    key: string
    title: string
    dataIndex: string
    sorter: {
      compare: () => boolean
      multiple: number
    }
  }
  columnKey: string
  field: string
  order: 'ascend' | 'descend'
}

export interface TableOptions {
  /**
   * 테이블 Row에 대한 Cursor: pointer 여부
   */
  pointer?: boolean
  /**
   * 테이블 Pagination 적용 여부
   */
  isPagination?: boolean
  /**
   * 테이블 No 칼럼 적용 여부
   */
  isShowNo?: boolean
  /**
   * 테이블 Row 체크박스를 통한 Select 사용 여부
   */
  isSelection?: boolean
}

export interface ToolbarOptions {
  /**
   * Toolbar 노출 여부
   */
  show: boolean
  /**
   * 테이블 레이아웃 모드
   */
  layoutMode: TableLayoutMode
}

export interface TableProps<RecordType = DefaultRecordType> extends ATableProps {
  /**
   * 테이블 데이터
   */
  dataSource?: RecordType[]
  /**
   * 테이블 칼럼 정보
   */
  columns: TableColumnType[]
  /**
   * 테이블 로딩
   */
  loading?: boolean
  /**
   * 테이블 데이터 목록 갯수
   */
  total?: number
  /**
   * 테이블 사이즈
   */
  size?: SizeType
  /**
   * 테이블 옵션 정보
   */
  options?: TableOptions
  /**
   * 테이블 Pagination 정보
   */
  pagination?: TablePagination
  /**
   * 테이블 리스트 랜던링에 사용되는 key
   */
  rowKey: string | 'key'
  /**
   * API 호출을 위한 초기 Request Parameter
   */
  initParam?: RequestParam
  /**
   * 테이블 레이아웃 타입 정보
   */
  layoutType?: TableLayoutMode
  /**
   * 테이블 Toolbar 노출 여부
   */
  showToolbar?: boolean
  /**
   * 테이블 Toolbar 검색 input placeholder
   */
  phText?: string
  /**
   * 테이블 Toolbar 옵선 정보
   */
  toolbarOptions?: ToolbarOptions
  /**
   * 테이블 데이터관련 Reqquest API
   * @param params Request Paramerter 정보
   */
  dataRequest?: (params: any) => Promise<API.ResponseData>
  /**
   * 테이블 칼럼 정보에 대한 Request API
   */
  columnRequest?: () => Promise<API.ResponseData<SortCodesResponse>>
  /**
   * Request API에 대한 응답 Data 처리를 위한 Callback
   * @param data
   */
  dataCallback?: (
    data: any
  ) => Record<string, any> & { content: Array<Record<string, any>>; totalElements: number }
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

export interface TableAction {
  setProps: (props: Partial<TableProps>) => void
  setContextValues: (value: Partial<TableContextValues>) => void
  fetchDataSource: (options?: {
    isReset?: boolean
    param?: { searchWord?: string }
  }) => Promise<void>
  getDataSource: () => Recordable[]
  getCardData: () => Recordable[]
  getSize: () => TableSize | CardSize
  getLoading: () => boolean
  reload: (isReset?: boolean) => Promise<void>
  initTableState: () => void
  initDataSource: () => void
  setPagination: (current: number, pageSize: number) => void
  initSelecion: () => void
  setSelectedRows: (selectedRows: Recordable[]) => void
  emitter: TableEmits
}

export interface TableContextValues {
  layoutMode: TableLayoutMode
  tableSize: TableSize
  cardSize: CardSize
  showSelectionPopup: boolean
}

export const defaultContenxtValues: TableContextValues = {
  layoutMode: 'table',
  tableSize: 'middle',
  cardSize: 'middle',
  showSelectionPopup: false
}

export interface TableEmits {
  (event: 'row-click', record: Recordable): void
  (event: 'row-dbClick', record: Recordable): void
  // (event: 'rowAdd'): void
  // (event: 'rowSelect'): void
  // (event: 'change'): void
  // (event: 'search'): void
}

interface RequestPagination {
  size: number
  page: number
}

interface RequestParam extends RequestPagination {}

export const defaultPaginaton: TablePagination = {
  total: 0,
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  position: ['topRight'],
  pageSizeOptions: ['10', '30', '50']
}

export const defaultOptions: TableOptions = {
  pointer: true,
  isShowNo: true,
  isSelection: true,
  isPagination: true
}

export const defaultToolbarOptions: ToolbarOptions = {
  show: true,
  layoutMode: 'all'
}

export const tableLayoutModes = {
  all: 'all',
  table: 'table',
  card: 'card'
} as const

export const tableSizeItems: Array<{ key: TableSize; label: string }> = [
  {
    key: 'middle',
    label: 'Default'
  },
  {
    key: 'small',
    label: 'Compact'
  },
  {
    key: 'large',
    label: 'Large'
  }
]

export const cardSizeItems: Array<{ key: CardSize; label: string }> = [
  {
    key: 'middle',
    label: 'Default'
  },
  {
    key: 'large',
    label: 'Large'
  }
]

export type TableLayoutMode = (typeof tableLayoutModes)[keyof typeof tableLayoutModes]
