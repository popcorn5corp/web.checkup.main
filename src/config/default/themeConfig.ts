import i18n from '@/locales'
import {
  type LayoutFontSize,
  type MenuPosition,
  type ThemeName,
  layoutFontSizes,
  menuPositions,
  themeNames
} from '@/stores/interface'

const { t } = i18n.global

export const themeStyle: ReadonlyArray<LabelValue<ThemeName>> = [
  {
    label: 'Light',
    value: themeNames.light
  },
  {
    label: 'Dark',
    value: themeNames.dark
  },
  {
    label: 'Real Dark',
    value: themeNames.realDark
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
    value: 'rgb(24, 144, 255)'
  },
  {
    label: 'Dust',
    value: 'rgb(245, 34, 45)'
  },
  {
    label: 'Volcano',
    value: 'rgb(250, 84, 28)'
  },
  {
    label: 'Sunset',
    value: 'rgb(250, 173, 20)'
  },
  {
    label: 'Cyan',
    value: 'rgb(19, 194, 194)'
  },
  {
    label: 'Green',
    value: 'rgb(82, 196, 26)'
  },
  {
    label: 'Geekblue',
    value: 'rgb(47, 84, 235)'
  },
  {
    label: 'Purple',
    value: 'rgb(114, 46, 209)'
  }
] as const
