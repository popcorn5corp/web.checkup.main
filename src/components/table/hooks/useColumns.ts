import type { TableColumnType } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import { reactive, toRefs } from 'vue'
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

export const useColumns = (
  initColumns: TableProps['columns'],
  request?: TableProps['columnRequest'],
  isShowNo: boolean = true
) => {
  const state = reactive<State>({
    columns: []
  })

  const getColumns = async (): Promise<void | State['columns']> => {
    const columns: State['columns'] = cloneDeep(initColumns)

    if (isShowNo) {
      columns.unshift(noColumn)
    }

    if (request) {
      const { success, data } = await request()

      if (success) {
        const { isSortable, enabledSortCodes } = data

        // Setting Sortable Columns
        if (isSortable) {
          columns.map((column) => {
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

    state.columns = columns
  }

  return {
    ...toRefs(state),
    getColumns
  }
}
