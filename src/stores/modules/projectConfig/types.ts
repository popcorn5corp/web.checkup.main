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
  dark: 'dark',
  realDark: 'realDark'
} as const

export const layoutFontSizes = {
  small: 12,
  medium: 13,
  large: 14
} as const

export const menuPositions = {
  side: 'sidemenu',
  top: 'topmenu'
} as const

export type LayoutType = (typeof layoutTypes)[keyof typeof layoutTypes]
export type ThemeName = (typeof themeNames)[keyof typeof themeNames]
export type LayoutFontSize = (typeof layoutFontSizes)[keyof typeof layoutFontSizes]
export type MenuPosition = (typeof menuPositions)[keyof typeof menuPositions]
export type LanguageType = 'zh' | 'en' | null
export enum DeviceTypeEnum {
  Mobile,
  Desktop
}
