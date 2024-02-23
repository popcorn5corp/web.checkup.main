import { createI18n } from 'vue-i18n'
// import type { I18n, I18nOptions } from 'vue-i18n'
// import { setHtmlPageLang, setLoadLocalePool } from '@/helpers/locale'
import { localeMap } from './config'
import en_US from './lang/en_US'
import id_ID from './lang/id_ID'
import ko_KR from './lang/ko_KR'

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

// function createI18nOptions() {
//   const localeStore = useLocaleStoreWithOut();
//   const locale = localeStore.getLocale;
//   const message = {
//     ko_KR: {
//       ...ko_KR.message
//     },
//     id_ID: {
//       ...id_ID.message
//     },
//     en_US: {
//       ...en_US.message
//     }
//   }

//   Helper.Locale.setHtmlPageLang(locale);

// }

const i18n = createI18n({
  legacy: false,
  allowComposition: true,
  locale: 'ko_KR',
  fallbackLocale: localeMap.ko_KR,
  messages: localeMessages,
  globalInjection: true
})

export default i18n
