import type { TableRowSelection } from 'ant-design-vue/es/table/interface'
import { computed, reactive, toRefs, watch, type Ref } from 'vue'

interface State {
  isSelected: boolean
  selectedRowKeys: Key[]
  selectedRows: any[]
}

export const useSelection = (rowKey: string = 'id', dataSource: Ref<any[]>) => {
  const state = reactive<State>({
    isSelected: false,
    selectedRowKeys: [],
    selectedRows: []
  })

  watch(
    () => dataSource.value,
    () => {
      // 데이터 테이블 리스트가 갱신되었을 경우, Selection 해제
      if (state.selectedRowKeys.length) {
        state.selectedRowKeys = []
      }
    },
    {
      immediate: true,
      deep: true
    }
  )

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
    rowSelection
  }
}
