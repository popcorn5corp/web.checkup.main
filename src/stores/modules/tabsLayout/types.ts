import type { RouteLocation } from 'vue-router'

export type RouteItem = Omit<RouteLocation, 'matched' | 'redirectedFrom'>

export interface TabsLayoutState {
  tabs: RouteItem[]
}
