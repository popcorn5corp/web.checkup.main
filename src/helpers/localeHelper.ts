import i18n from '@/locales'
import { Util } from '@/utils'
import { set } from 'lodash-es'
import type { LocaleType } from '@/locales/config'
import { LOCALE_KEY } from '@/constants/cacheKeyEnum'

const locales = {
  get defaultLocale() {
    return import.meta.env.VITE_DEFAULT_LOCALE
  },
  set currentLocale(newLocale) {
    i18n.global.locale.value = newLocale
  },
  get currentLocale() {
    return i18n.global.locale.value
  },
  set persistedLocale(newLocale) {
    Util.Storage.set(LOCALE_KEY, newLocale)
  },
  get persistedLocale() {
    const persistedLocale = Util.Storage.get(LOCALE_KEY)
    return persistedLocale || null
  },
  get browserLanguage(): LocaleType {
    return navigator.language
      ? (navigator.language.replace('-', '_') as LocaleType)
      : this.defaultLocale
  }
}

const loadLocalePool: LocaleType[] = []

function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale)
}

function setLoadLocalePool(cb: (loadLocalePool: LocaleType[]) => void) {
  cb(loadLocalePool)
}

function genMessage(langs: Recordable<Recordable>, prefix = 'lang') {
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

export const LocaleHelper = {
  locales,
  loadLocalePool,
  setHtmlPageLang,
  setLoadLocalePool,
  genMessage
}
