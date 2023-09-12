import type { TableEmits, TableProps } from '@/components/table'

export interface DynamicTableProps extends TableProps {
  showToolbar?: boolean
}

export interface DynamicTableEmits extends TableEmits {}
