import type { TableRowSelection } from 'ant-design-vue/es/table/interface'
import { type ComputedRef, type Ref, computed, reactive, toRefs, unref, watch } from 'vue'
import type { TableContextValues } from '../types'

interface State {
  isSelected: boolean
  selectedRowKeys: Key[]
  selectedRows: any[]
}

export const useSelection = (
  contextValuesRef: ComputedRef<TableContextValues>,
  dataSource: Ref<Recordable[]>
) => {
  const state = reactive<State>({
    isSelected: false,
    selectedRowKeys: [],
    selectedRows: []
  })

  watch(
    () => unref(dataSource),
    () => {
      // 데이터 테이블 리스트가 갱신되었을 경우, Selection 해제
      if (state.selectedRows.length) {
        initSelecion()
      }
    },
    {
      immediate: true,
      deep: true
    }
  )

  function initSelecion() {
    state.selectedRowKeys = []
    state.selectedRows = []
  }

  function setSelectedRows(selectedRows: Recordable[]) {
    state.selectedRows = selectedRows
    state.selectedRowKeys = selectedRows.map((r) => r.rowKey)
  }

  const rowSelection = computed<TableRowSelection>(() => {
    return {
      selectedRowKeys: state.selectedRowKeys,
      onChange: (changableRowKeys: Key[], changableRows: any[]) => {
        state.selectedRowKeys = changableRowKeys
        state.selectedRows = changableRows
      }
    }
  })

  return {
    ...toRefs(state),
    rowSelection,
    initSelecion,
    setSelectedRows
  }
}
