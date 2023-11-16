import type { ActionType } from 'ant-design-vue/es/vc-trigger/interface'
import { type ComputedRef, unref } from 'vue'
import type { TableAction, TableContextValues } from '../types'
import { useTableContext } from './useTableContext'

export const useCardView = (
  contextValuesRef: ComputedRef<TableContextValues>,
  dataSource: ComputedRef<any[]>
) => {
  function initCardViewChecked() {
    unref(dataSource).map((r) => {
      r.checked = false
    })
  }

  return {
    initCardViewChecked
  }
}
