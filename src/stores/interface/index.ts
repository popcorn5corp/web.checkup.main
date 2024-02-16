import type { CheckboxValueType } from 'ant-design-vue/es/checkbox/interface'
import type { RouteLocation } from 'vue-router'
import type { IAuth } from '@/services/auth/types'
import { type FilterFormItem } from '@/components/filter-form'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/cacheKeyEnum'

// export type LayoutType = 'default' | 'vertical' | 'transverse' | 'columns'
export type AssemblySizeType = 'large' | 'default' | 'small'
export type LanguageType = 'zh' | 'en' | null

export enum DeviceTypeEnum {
  Mobile,
  Desktop
}

export const layoutTypes = {
  default: 'default',
  pure: 'pure'
  // vertical: 'vertical',
  // transverse: 'transverse',
  // columns: 'columns'
} as const

export const layouts = {
  default: 'default',
  pure: 'pure'
  // vertical: 'vertical',
  // transverse: 'transverse',
  // columns: 'columns'
} as const

export const themeNames = {
  light: 'light',
  semiDark: 'semiDark',
  dark: 'dark'
} as const

// export const themeNames = {
//   light: 'light',
//   dark: 'dark',
//   realDark: 'realDark'
// } as const

export const layoutFontSizes = {
  small: 12,
  medium: 13,
  large: 14
} as const

// export const menuPositions = {
//   side: 'sidemenu',
//   top: 'topmenu'
// } as const

export const menuPositions = {
  side: 'side',
  top: 'top'
} as const

export type LayoutType = (typeof layoutTypes)[keyof typeof layoutTypes]
export type ThemeName = (typeof themeNames)[keyof typeof themeNames]
export type LayoutFontSize = (typeof layoutFontSizes)[keyof typeof layoutFontSizes]
export type MenuPosition = (typeof menuPositions)[keyof typeof menuPositions]

export interface ThemeConfig {
  navTheme: ThemeName // theme for nav menu
  isRealDarkTheme: boolean
  isDark: boolean
  primaryColor: string // '#F5222D', // primary color of ant design
  menuPosition: MenuPosition // nav menu position: `sidemenu` or `topmenu`
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
  fontSize: LayoutFontSize
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
  device?: DeviceTypeEnum
  theme: ThemeConfig
}

export type RouteItem = Omit<RouteLocation, 'matched' | 'redirectedFrom'>

export interface TabsLayoutState {
  tabs: RouteItem[]
}

export type OptionType = { label: string; value: string | number }
export type SelectedType = string | number | [] | null | CheckboxValueType[]
export interface Params {
  [key: string]: SelectedType
}
export interface TableFilterState {
  selectedData: Params
  filterList: FilterFormItem[]
}

export interface UserState {}

export type TokenKey = typeof ACCESS_TOKEN_KEY | typeof REFRESH_TOKEN_KEY

export type IUser = IAuth.UserResponse & {
  accessToken: string
}
export interface AuthState {
  user: IUser
}
