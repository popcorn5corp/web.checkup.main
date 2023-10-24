import type { ComputedRef } from 'vue'
import type { TableEmits, TableProps } from '../types'

interface Options {
  emit: TableEmits
}

export function useCustomRow(options: Options) {
  const { emit } = options

  const customRow = (record: Recordable, index: number) => {
    return {
      onClick: (event: Event) => {
        emit('row-click', record)
      },
      onDblclick: (event: Event) => {
        emit('row-dbClick', record)
      }
    }
  }

  return {
    customRow,
    emit
  }
}
