import type { PaginationProps } from 'ant-design-vue/lib/pagination'
import type { DefaultRecordType, ColumnsType } from 'ant-design-vue/lib/vc-table/interface'
import type { Dayjs } from 'dayjs'
type PaginationPositon =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'

type TableSize = 'default' | 'middle' | 'small' | 'large'

export interface DefaultPagination extends PaginationProps {
  position: PaginationPositon[]
}

export interface TableProps<RecordType = DefaultRecordType> {
  columns: RecordType[]
  dataSource: RecordType[]
  loading?: boolean
  total?: number
  showHeader?: boolean
  size?: TableSize
  options?: TableOptions
  pagination?: DefaultPagination
}

export interface TableOptions {
  pointer: boolean
  isPagination: boolean
  isShowNo: boolean
}

export interface TableEmits {}

export enum FilterTypeEnum {
  'SELECT' = 'select',
  'DATEPICKER' = 'datepicker',
  'CHECKBOX' = 'checkbox',
  'RADIO' = 'radio'
}

export interface Filter {
  type: FilterTypeEnum
  title: string
  open: boolean
  options: []
  selected: [] | {}
}
