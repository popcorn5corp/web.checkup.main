import type { MenuMode, MenuTheme } from 'ant-design-vue'

export interface MenuProps {
  items: any
  collapsed: boolean
  theme?: MenuTheme
  // mode?: MenuMode
}

export type { MenuTheme }
