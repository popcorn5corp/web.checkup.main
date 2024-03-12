import type { RouteLocation } from 'vue-router'
import { tabOptionKeyTypes } from './data'

export type RouteItem = Omit<RouteLocation, 'matched' | 'redirectedFrom'>

export interface TabsLayoutState {
  tabs: RouteItem[]
}

export type TabOptionKeyType = (typeof tabOptionKeyTypes)[keyof typeof tabOptionKeyTypes]
