import type { PaginationProps } from 'ant-design-vue/lib/pagination'
import type { DefaultRecordType } from 'ant-design-vue/lib/vc-table/interface'
import type { TableColumnType } from 'ant-design-vue'
import type { ColumnType, TableCurrentDataSource } from 'ant-design-vue/es/table/interface'
type PaginationPositon =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'

type TableSize = 'middle' | 'small' | 'large'

export interface TablePagination {
  total: number
  current: number
  pageSize: number
  showSizeChanger: boolean
  position: [PaginationPositon]
  pageSizeOptions: string[]
}

// export interface TablePagination extends PaginationProps {
//   position: PaginationPositon[]
// }

export interface TableProps<RecordType = DefaultRecordType> {
  columns: ColumnType<RecordType>[]
  dataSource?: RecordType[]
  loading?: boolean
  total?: number
  showHeader?: boolean
  size?: TableSize
  options?: TableOptions
  pagination?: TablePagination
}

export interface TableOptions {
  pointer?: boolean
  isPagination?: boolean
  isShowNo?: boolean
}

export interface TableEmits {}

export const FilterTypes = {
  SELECT: 'select',
  DATEPICKER: 'datepicker',
  CHECKBOX: 'checkbox',
  RADIO: 'radio'
} as const

export type FilterType = (typeof FilterTypes)[keyof typeof FilterTypes]

export interface Filter {
  type: FilterType
  title: string
  open: boolean
  options: LabelValue[]
  selectedItems: []
}

interface RequestPagination {
  size: number
  page: number
}

interface RequestParam extends RequestPagination {}

export interface DynamicTableProps extends TableProps {
  mode?: 'basic' | 'dynamic'
  request?: (params: any) => Promise<any> // 테이블 데이터 API
  dataCallback?: (data: any) => any // 데이터를 후처리 할 수 있는 callback 함수 제공
  initParam?: RequestParam // API 호출을 위한 초기 Request Parameter
  rowKey?: string | 'id' // 데이터 테이블 랜던링에 사용되는 key
}

export interface DynamicTableEmits {}
