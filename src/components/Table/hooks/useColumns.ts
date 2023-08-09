import type { TableColumnType } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import { reactive, toRefs } from 'vue'
import type { SortCodesResponse } from '@/services/BaseSample/interface'
import type { DynamicTableProps } from '../interface'

interface State {
  columns: TableColumnType[]
}

const noColumn = {
  title: 'No',
  align: 'center',
  dataIndex: 'index',
  key: 'index'
} as const

export const useColumns = (
  request?: DynamicTableProps['columnRequest'],
  initColumns?: TableColumnType[],
  isShowNo: boolean = true
) => {
  const state = reactive<State>({
    columns: []
  })

  const getColumns = async (): Promise<void> => {
    if (!request) return

    const { success, data } = await request()

    if (success) {
      const { isSortable, enabledSortCodes } = data

      if (isSortable && initColumns) {
        const columns: TableColumnType[] = cloneDeep(initColumns)

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

        if (isShowNo) {
          columns.unshift(noColumn)
        }

        state.columns = columns
      }
    }
  }

  return {
    ...toRefs(state),
    getColumns
  }
}
