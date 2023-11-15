import type { TableProps as ATableProps, TableColumnType } from 'ant-design-vue'
// import type { ColumnType } from 'ant-design-vue/es/table/interface'
import type { DefaultRecordType } from 'ant-design-vue/lib/vc-table/interface'
import type EventEmitter from 'events'
import type { SortCodesResponse } from '@/services/BaseSample/interface'

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
  pointer?: boolean
  isPagination?: boolean
  isShowNo?: boolean
  isSelection?: boolean
}

export interface TableProps<RecordType = DefaultRecordType> extends ATableProps {
  dataSource?: RecordType[]
  loading?: boolean
  total?: number
  size?: SizeType
  options?: TableOptions
  pagination?: TablePagination
  // 데이터 테이블 리스트 랜던링에 사용되는 key
  rowKey?: string | 'key'
  // 테이블 데이터 API 처리
  dataRequest?: (params: any) => Promise<API.ResponseData>
  // 데이터를 후처리 할 수 있는 callback 함수 제공
  dataCallback?: (data: any) => any
  // 테이블 칼럼 정보에 대한 API
  columnRequest?: () => Promise<API.ResponseData<SortCodesResponse>>
  // API 호출을 위한 초기 Request Parameter
  initParam?: RequestParam
  // 정적으로 정의된 테이블 칼럼 정보
  columns: TableColumnType[]
  // 데이터 테이블 Toolbar 노출 여부
  showToolbar?: boolean
  // 테이블 레이아웃 타입 정보
  layoutType?: TableLayoutMode
  // Toolbar 옵선 정보
  toolbarOptions?: ToolbarOptions
}

export interface ToolbarOptions {
  // Toolbar 노출 여부
  show: boolean
  // 테이블 레이아웃 모드
  layoutMode: TableLayoutMode
}

export interface TableAction {
  setProps: (props: Partial<TableProps>) => void
  setContextValues: (value: Partial<TableContextValues>) => void
  fetchDataSource: (options?: {
    isReset?: boolean
    param?: { searchWord?: string }
  }) => Promise<void>
  getDataSource: () => Recordable[]
  getSize: () => TableSize | CardSize
  getLoading: () => boolean
  reload: (isReset?: boolean) => Promise<void>
  initTableState: () => void
  changeTable: TableProps['onChange']
  getRecordNo: (index: number) => number
  getPagination: () => TablePagination | false
  setPagination: (current: number, pageSize: number) => void
  emitter: TableEmits
}

export interface TableContextValues {
  layoutMode: TableLayoutMode
  tableSize: TableSize
  cardSize: CardSize
}

export const defaultContenxtValues: TableContextValues = {
  layoutMode: 'table',
  tableSize: 'middle',
  cardSize: 'middle'
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
