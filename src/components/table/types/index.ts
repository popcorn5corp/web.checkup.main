import type { TableProps as ATableProps, PaginationProps, TableColumnType } from 'ant-design-vue'
import type { ColumnType } from 'ant-design-vue/es/table/interface'
import type { DefaultRecordType } from 'ant-design-vue/lib/vc-table/interface'
import type { SortCodesResponse } from '@/services/BaseSample/interface'

type PaginationPositon =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'

type TableSize = 'small' | 'middle' | 'large'

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
  pointer: boolean
  isPagination: boolean
  isShowNo: boolean
  isSelection: boolean
}

export interface TableProps<RecordType = DefaultRecordType> extends ATableProps {
  columns: ColumnType<RecordType>[]
  dataSource?: RecordType[]
  loading?: boolean
  total?: number
  size?: TableSize
  options?: Partial<TableOptions>
  pagination?: Partial<TablePagination>

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
  initColumns?: TableColumnType[]
  // 데이터 테이블 Toolbar 노출 여부
  showToolbar?: boolean
}

export interface TableEmits {
  (event: 'rowClick', record: Object): void
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

export const defaultPaginaton: Readonly<TablePagination> = {
  total: 0,
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  position: ['bottomRight'],
  pageSizeOptions: ['10', '30', '50']
}

export const defaultOptions: Readonly<TableOptions> = {
  pointer: true,
  isShowNo: true,
  isSelection: true,
  isPagination: true
}
