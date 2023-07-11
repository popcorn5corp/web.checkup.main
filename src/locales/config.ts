export type LocaleType = keyof typeof localeMap

export const localeMap = {
  ko_KR: 'ko_KR',
  en_US: 'en_US',
  id_ID: 'id_ID'
} as const

export const localeList = [
  {
    lang: localeMap.ko_KR,
    label: '한국어',
    icon: '🇰🇷',
    title: '언어'
  },
  {
    lang: localeMap.en_US,
    label: 'English',
    icon: '🇺🇸',
    title: 'Language'
  },
  {
    lang: localeMap.id_ID,
    label: 'Bahasa Indonesia',
    icon: '🇲🇨',
    title: 'Bahasa'
  }
] as const
