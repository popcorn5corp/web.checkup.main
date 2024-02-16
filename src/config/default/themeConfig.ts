import i18n from '@/locales'
import {
  type LayoutFontSize,
  type MenuPosition,
  type ThemeName,
  layoutFontSizes,
  menuPositions,
  themeNames
} from '@/stores/interface'

// const { t } = i18n.global

export const DEFAULT_PRIMARY_COLOR = '#1890ff'
export const DEFAULT_FONT_SIZE = 13
export const DEFAULT_THEME_NAME = 'light'
export const DEFAULT_MENU_POSITION = 'side'
export const DEFAULT_MENU_THEME_NAME = 'light'

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
    label: 'Side Menu',
    value: menuPositions.side
  },
  {
    label: 'Top Menu',
    value: menuPositions.top
  }
] as const

export const layoutFonts: ReadonlyArray<LabelValue<LayoutFontSize>> = [
  // {
  //   label: t('layout.header.settings.fontSizeSmall'),
  //   value: layoutFontSizes.small
  // },
  // {
  //   label: t('layout.header.settings.fontSizeMedium'),
  //   value: layoutFontSizes.medium
  // },
  // {
  //   label: t('layout.header.settings.fontSizeLarge'),
  //   value: layoutFontSizes.large
  // }
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
