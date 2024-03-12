import type { TabOptionKeyType } from './types'
import i18n from '@/locales'

const { t } = i18n.global

export const tabOptionKeyTypes = {
  CLOSE_ALL: 'closeAll',
  CLOSE_OTHERS: 'closeOthers'
} as const

export const tabOptions: { key: TabOptionKeyType; title: string }[] = [
  {
    key: tabOptionKeyTypes.CLOSE_ALL,
    title: t('layout.tabs.closeAll')
  },
  {
    key: tabOptionKeyTypes.CLOSE_OTHERS,
    title: t('layout.tabs.closeAllOthers')
  }
] as const
