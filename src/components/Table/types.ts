import type { PaginationProps } from 'ant-design-vue/lib/pagination'
import type { DefaultRecordType } from 'ant-design-vue/lib/vc-table/interface'

type PaginationPositon =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'

type TableSize = 'middle' | 'small' | 'large'

export interface TablePagination extends PaginationProps {
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
  RANGEDATEPICKER: 'rangeDatePicker',
  CHECKBOX: 'checkbox',
  RADIO: 'radio'
} as const

export type FilterType = (typeof FilterTypes)[keyof typeof FilterTypes]

export interface Filter {
  type: FilterType
  title: string
  open: boolean
  options: LabelValue[]
  selectedItems: LabelValue[]
}
