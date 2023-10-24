import type { TableColumnType } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import { type ComputedRef, computed, reactive, ref, toRefs, unref } from 'vue'
import type { SortCodesResponse } from '@/services/BaseSample/interface'
import type { TableProps } from '../types'

interface State {
  columns: TableProps['columns']
}

const noColumn = {
  title: 'No',
  align: 'center',
  dataIndex: 'index',
  key: 'index'
} as const

export const useColumns = (propsRef: ComputedRef<TableProps>) => {
  const innerColumns = ref(unref(propsRef).columns)

  const getColumns = computed(() => unref(innerColumns))

  async function setColumns(): Promise<void | State['columns']> {
    const {
      columns,
      options: { isShowNo },
      columnRequest
    } = unref(propsRef)

    const _columns: State['columns'] = cloneDeep(columns)

    if (isShowNo) {
      _columns.unshift(noColumn)
    }

    if (columnRequest) {
      const { success, data } = await columnRequest()

      if (success) {
        const { isSortable, enabledSortCodes } = data

        // Setting Sortable Columns
        if (isSortable) {
          _columns.map((column) => {
            const index = enabledSortCodes.findIndex((r) => r.sortCode === column.key)
            const findSortCode = enabledSortCodes[index]

            if (findSortCode) {
              column.sorter = {
                compare: (a, b) => {
                  const columnKey = column.key as string
                  return a[columnKey] - b[columnKey]
                },
                multiple: index
              }
            }
          })
        }
      }
    }

    innerColumns.value = _columns
  }

  return {
    getColumns,
    setColumns
  }
}
