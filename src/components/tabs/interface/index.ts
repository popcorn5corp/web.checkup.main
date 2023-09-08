import type { TabPaneProps as ATabPaneProps } from 'ant-design-vue'
import type { TabPosition } from 'ant-design-vue/es/tabs/src/interface'
import type { Component, VNode } from 'vue'

export interface Tab {
  key: string
  title: string
  content?: string | VNode
  component?: Component
  icon?: Component
  closable?: boolean
}

export type TabList = Tab[]
export type TabsType = 'line' | 'card' | 'editable-card'

export interface TabsProps {
  key: string
  tabs: TabList
  tabPosition?: TabPosition
  type?: TabsType
}

export interface TabPaneProps extends ATabPaneProps {}
