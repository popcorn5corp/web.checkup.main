import antdLocale from 'ant-design-vue/es/locale/ko_KR'
import { set } from 'lodash-es'
import { createI18n } from 'vue-i18n'
import { localeMap } from './config'

export function genMessage(langs: Recordable<Recordable>, prefix = 'lang') {
  const obj: Recordable = {}

  Object.keys(langs).forEach((key) => {
    const langFileModule = langs[key].default
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '')
    const lastIndex = fileName.lastIndexOf('.')
    fileName = fileName.substring(0, lastIndex)
    const keyList = fileName.split('/')
    const moduleName = keyList.shift()
    const objKey = keyList.join('.')

    if (moduleName) {
      if (objKey) {
        set(obj, moduleName, obj[moduleName] || {})
        set(obj[moduleName], objKey, langFileModule)
      } else {
        set(obj, moduleName, langFileModule || {})
      }
    }
  })

  return obj
}

export const localeMessages = {
  ko_KR: {
    ...genMessage(
      import.meta.glob<Recordable>(`./lang/ko_KR/**/*.ts`, { eager: true }),
      localeMap.ko_KR
    ).lang.ko_KR,
    antdLocale
  },

  id_ID: {
    ...genMessage(
      import.meta.glob<Recordable>(`./lang/id_ID/**/*.ts`, { eager: true }),
      localeMap.id_ID
    ).lang.id_ID,
    antdLocale
  },

  en_US: {
    ...genMessage(
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
