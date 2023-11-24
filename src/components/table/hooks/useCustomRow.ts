import { ref } from 'vue'
import type { TableEmits } from '../types'

interface Options {
  emit: TableEmits
}

export function useCustomRow(options: Options) {
  const { emit } = options
  const selectedRowIndex = ref()

  const customRow = (record: Recordable, index: number) => {
    return {
      onClick: (event: Event) => {
        selectedRowIndex.value = index
        emit('row-click', record)
      },
      onDblclick: (event: Event) => {
        emit('row-dbClick', record)
      }
    }
  }

  const rowClassName = (record: any, index: number) => {
    return selectedRowIndex.value === index ? 'table-row-focus' : ''
  }

  return {
    customRow,
    rowClassName,
    emit
  }
}
