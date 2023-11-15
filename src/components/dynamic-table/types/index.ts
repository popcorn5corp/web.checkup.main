import type { FilterFormItem, FilterList } from '@/components/filter-form'
import type { TableEmits, TableProps } from '@/components/table'

export interface DynamicTableProps extends TableProps {
  showToolbar?: boolean
  showFilter?: boolean
  filters: FilterList
}

export interface DynamicTableEmits {}

export interface DynamicTableAction {
  setProps: (props: Partial<DynamicTableProps>) => void
  setContextValues: (value: Partial<DynamicTableContextValues>) => void
  emitter: DynamicTableEmits
}

export interface DynamicTableContextValues {
  filterFormItems: FilterFormItem[]
}

export const defaultContenxtValues: DynamicTableContextValues = {
  filterFormItems: []
}

export type TableFilterList = FilterList
