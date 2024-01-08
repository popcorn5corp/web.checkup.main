import { createI18n } from 'vue-i18n'
// import type { I18n, I18nOptions } from 'vue-i18n'
// import { setHtmlPageLang, setLoadLocalePool } from '@/helpers/locale'
import { useLocaleStoreWithOut } from '@/stores/modules/locale'
import { localeMap } from './config'
import en_US from './lang/en_US'
import id_ID from './lang/id_ID'
import ko_KR from './lang/ko_KR'

const localeStore = useLocaleStoreWithOut()
const locale = localeStore.getLocaleInfo()

console.log('locale ', locale)
export const localeMessages = {
  ko_KR: {
    ...ko_KR.message
  },
  id_ID: {
    ...id_ID.message
  },
  en_US: {
    ...en_US.message
  }
}

const i18n = createI18n({
  legacy: false,
  allowComposition: true,
  locale,
  fallbackLocale: localeMap.ko_KR,
  messages: localeMessages,
  globalInjection: true
})

export default i18n
