import type { RouteLocation, RouteRecordName } from 'vue-router'

// export type LayoutType = 'default' | 'vertical' | 'transverse' | 'columns'
export type AssemblySizeType = 'large' | 'default' | 'small'
export type LanguageType = 'zh' | 'en' | null

export enum DeviceTypeEnum {
  Mobile,
  Desktop
}

export enum LayoutTypeEnum {
  DEFAULT = 'default'
  // VERTICAL = 'vertical',
  // TRANSVERSE = 'transverse',
  // COLUMNS = 'columns'
}

export const layouts = {
  default: 'default'
  // vertical: 'vertical',
  // transverse: 'transverse',
  // columns: 'columns'
} as const

export type LayoutType = (typeof layouts)[keyof typeof layouts]

export type ThemeName = 'light' | 'dark' | 'realDark'
export interface Theme {
  navTheme: ThemeName // theme for nav menu
  isDark: boolean
  primaryColor: string // '#F5222D', // primary color of ant design
  layout: 'sidemenu' | 'topmenu' // nav menu position: `sidemenu` or `topmenu`
  contentWidth: 'Fluid' | 'Fixed' // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
  fixedHeader: boolean // sticky header
  fixSiderbar: boolean // sticky siderbar
  colorWeak: boolean
  menu: {
    locale: boolean
  }
  title: string
  pwa: boolean
  iconfontUrl: string
  logoFileName: string
  // production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
}

export interface ProjectConfigState {
  layout: LayoutType
  // assemblySize: AssemblySizeType
  language: LanguageType
  maximize: boolean
  primary: string
  isDark: boolean
  // isGrey: boolean
  // isWeak: boolean
  // asideInverted: boolean
  isCollapse: boolean
  // breadcrumb: boolean
  // breadcrumbIcon: boolean
  // tabs: boolean
  // tabsIcon: boolean
  // footer: boolean
  device: DeviceTypeEnum
  theme: Theme
}

export type RouteItem = Omit<RouteLocation, 'matched' | 'redirectedFrom'>

export interface TabsLayoutState {
  tabs: RouteItem[]
}

export interface UserState {}

export interface AuthState {}
