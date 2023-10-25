import { inject, provide } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import type { DynamicTableAction, DynamicTableProps } from '../types'

const key = Symbol('dynamic-table')

type Instance = DynamicTableAction & {
  wrapRef: Ref<Nullable<HTMLElement>>
  getBindValues: ComputedRef<Recordable>
}

type RetInstance = Omit<Instance, 'getBindValues'> & {
  getBindValues: ComputedRef<DynamicTableProps>
}

export function createDynamicTableContext(instance: Instance) {
  provide(key, instance)
}

export function useDynamicTableContext(): RetInstance {
  return inject(key) as RetInstance
}
