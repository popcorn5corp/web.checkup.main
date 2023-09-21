import type { TableEmits, TableProps } from '@/components/table'

export interface DynamicTableProps extends TableProps {
  showToolbar?: boolean
  showFilter?: boolean
}

export interface DynamicTableEmits extends TableEmits {}
