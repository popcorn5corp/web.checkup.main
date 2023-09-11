import type { TableColumnType } from 'ant-design-vue'
import type { ColumnType, TableRowSelection } from 'ant-design-vue/es/table/interface'
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
  DATE_PICKER: 'datepicker',
  RANGE_DATE_PICKER: 'rangeDatePicker',
  CHECKBOX: 'checkbox',
  RADIO: 'radio'
} as const

export type FilterType = (typeof FilterTypes)[keyof typeof FilterTypes]

export interface Filter {
  type: FilterType
  title: string
  options: LabelValue[]
  selectedItems: any[]
}

interface RequestPagination {
  size: number
  page: number
}

interface RequestParam extends RequestPagination {}

export interface DynamicTableProps extends TableProps {
  rowKey?: string | 'key' // 데이터 테이블 리스트 랜던링에 사용되는 key
  mode?: 'basic' | 'dynamic' // 데이터 테이블 Mode
  dataRequest: (params: any) => Promise<API.ResponseData> // 테이블 데이터 API 처리
  dataCallback?: (data: any) => any // 데이터를 후처리 할 수 있는 callback 함수 제공
  columnRequest: () => Promise<API.ResponseData<SortCodesResponse>> // 테이블 칼럼 정보에 대한 API
  initParam: RequestParam // API 호출을 위한 초기 Request Parameter
  initColumns: TableColumnType[] // 정적으로 정의된 테이블 칼럼 정보
  showToolbar?: boolean // 데이터 테이블 Toolbar 노출 여부
}

export interface DynamicTableEmits {}
