import type { TableEmits, TableProps } from '@/components/table'

export interface DynamicTableProps extends TableProps {
  showToolbar?: boolean
  showFilter?: boolean
  filters?: any[]
}

export interface DynamicTableEmits extends TableEmits {}

export interface DynamicTableAction {}
