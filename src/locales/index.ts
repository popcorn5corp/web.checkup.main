import { Helper } from '@/helpers'
import antdLocale from 'ant-design-vue/es/locale/ko_KR'
import { createI18n } from 'vue-i18n'
import { localeMap } from './config'

export const localeMessages = {
  // ko_KR: {
  //   ...ko_KR.message
  // },
  // id_ID: {
  //   ...id_ID.message
  // },
  // en_US: {
  //   ...en_US.message
  // }
  ko_KR: {
    ...Helper.Locale.genMessage(
      import.meta.glob<Recordable>(`./lang/ko_KR/**/*.ts`, { eager: true }),
      localeMap.ko_KR
    ).lang.ko_KR,
    antdLocale
  },

  id_ID: {
    ...Helper.Locale.genMessage(
      import.meta.glob<Recordable>(`./lang/id_ID/**/*.ts`, { eager: true }),
      localeMap.id_ID
    ).lang.id_ID,
    antdLocale
  },

  en_US: {
    ...Helper.Locale.genMessage(
      import.meta.glob<Recordable>(`./lang/en_US/**/*.ts`, { eager: true }),
      localeMap.en_US
    ).lang.en_US,
    antdLocale
  }
}

console.log(localeMessages)
const i18n = createI18n({
  legacy: false,
  allowComposition: true,
  locale: 'ko_KR',
  fallbackLocale: localeMap.ko_KR,
  messages: localeMessages,
  globalInjection: true
})

export default i18n
