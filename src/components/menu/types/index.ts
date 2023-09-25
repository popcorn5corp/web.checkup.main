import type { MenuMode, MenuTheme } from 'ant-design-vue'

export type MenuList = MenuItem[]
export interface MenuItem {
  path: string
  name: string
  meta: {
    title: string
    icon: string
    namePath: string[]
    fullPath: string
    isNew: boolean
  }
  children?: MenuItem[]
}
export interface MenuProps {
  items: any
  collapsed: boolean
  theme?: MenuTheme
  mode?: MenuMode
  isSide: boolean
}

export type { MenuTheme }
