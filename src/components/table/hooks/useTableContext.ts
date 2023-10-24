import { inject, provide } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import type { TableAction, TableProps } from '../types'

const key = Symbol('table')

type Instance = TableAction & {
  wrapRef: Ref<Nullable<HTMLElement>>
  getBindValues: ComputedRef<Recordable>
}

type RetInstance = Omit<Instance, 'getBindValues'> & {
  getBindValues: ComputedRef<TableProps>
}

export function createTableContext(instance: Instance) {
  provide(key, instance)
}

export function useTableContext(): RetInstance {
  return inject(key) as RetInstance
}
