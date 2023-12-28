import { inject, provide } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import type { DynamicTableAction, DynamicTableContextValues, DynamicTableProps } from '../types'

const key = Symbol('dynamic-table')

type Instance = DynamicTableAction & {
  wrapRef: Ref<Nullable<HTMLElement>>
  getContextValues: ComputedRef<Recordable>
  getBindValues: ComputedRef<Recordable>
}

export type RetInstance = Omit<Instance, 'getBindValues'> & {
  getBindValues: ComputedRef<DynamicTableProps>
  getContextValues: ComputedRef<DynamicTableContextValues>
}

export function createDynamicTableContext(instance: Instance) {
  if (instance) {
    provide(key, instance)
  }
}

export function useDynamicTableContext(): RetInstance {
  return inject(key) as RetInstance
}
