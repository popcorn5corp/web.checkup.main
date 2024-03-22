import { PagePathEnum } from '@/constants/pageEnum'
import i18n from '@/locales'
import type { MenuTheme } from 'ant-design-vue'

const { t } = i18n.global

// export type LayoutType = 'default' | 'vertical' | 'transverse' | 'columns'
export type AssemblySizeType = 'large' | 'default' | 'small'
export const layoutTypes = {
  default: 'default',
  pure: 'pure'
} as const

export const themeNames = {
  light: 'light',
  semiDark: 'semiDark',
  dark: 'dark'
} as const

export const layoutFontSizes = {
  small: 12,
  medium: 13,
  large: 14
} as const

export const menuPositions = {
  side: 'side',
  top: 'top'
} as const

export const DEFAULT_PRIMARY_COLOR = 'rgba(24, 144, 255, 1)' // '#1890ff'
export const DEFAULT_FONT_SIZE = 13
export const DEFAULT_THEME_NAME = 'light'
export const DEFAULT_MENU_POSITION = 'side'
export const DEFAULT_MENU_THEME_NAME = 'light'

type DefaultThemeName = typeof DEFAULT_THEME_NAME
export type ThemeName = DefaultThemeName | 'semiDark' | 'dark'
export type LayoutType = (typeof layoutTypes)[keyof typeof layoutTypes]
// export type ThemeName = (typeof themeNames)[keyof typeof themeNames]
export type LayoutFontSize = (typeof layoutFontSizes)[keyof typeof layoutFontSizes]
export type MenuPosition = (typeof menuPositions)[keyof typeof menuPositions]
export type MenuThemeName = MenuTheme

export enum ThemeEnum {
  LIGHT = 'light',
  SEMI_DARK = 'semiDark',
  DARK = 'dark'
}

export const themeStyle: ReadonlyArray<LabelValue<ThemeName>> = [
  {
    label: 'Light',
    value: themeNames.light
  },
  {
    label: 'Semi Dark',
    value: themeNames.semiDark
  },
  {
    label: 'Dark',
    value: themeNames.dark
  }
] as const

export const menuLayouts: ReadonlyArray<LabelValue<MenuPosition>> = [
  {
    label: 'Top Menu',
    value: menuPositions.top
  },
  {
    label: 'Side Menu',
    value: menuPositions.side
  }
] as const

export const layoutFonts: ReadonlyArray<LabelValue<LayoutFontSize>> = [
  {
    label: t('layout.header.settings.fontSizeSmall'),
    value: layoutFontSizes.small
  },
  {
    label: t('layout.header.settings.fontSizeMedium'),
    value: layoutFontSizes.medium
  },
  {
    label: t('layout.header.settings.fontSizeLarge'),
    value: layoutFontSizes.large
  }
] as const

export const themeColors: ReadonlyArray<LabelValue<string>> = [
  {
    label: 'Daybreak',
    value: 'rgba(24, 144, 255, 1)'
  },
  {
    label: 'Dust',
    value: 'rgba(245, 34, 45, 1)'
  },
  {
    label: 'Volcano',
    value: 'rgba(250, 84, 28, 1)'
  },
  {
    label: 'Sunset',
    value: 'rgba(250, 173, 20, 1)'
  },
  {
    label: 'Cyan',
    value: 'rgba(19, 194, 194, 1)'
  },
  {
    label: 'Green',
    value: 'rgba(82, 196, 26, 1)'
  },
  {
    label: 'Geekblue',
    value: 'rgba(47, 84, 235, 1)'
  },
  {
    label: 'Purple',
    value: 'rgba(114, 46, 209, 1)'
  }
] as const

export const themeBlackList = [PagePathEnum.BASE_LOGIN] as string[]
