import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { Storage } from '@/utils/storage'
import { LOCALE_KEY } from '@/enums/cacheKeyEnum'
import { localeMap, type LocaleType } from '@/locales/config'
import { store } from '@/stores'
import i18n from '@/locales'

interface LocaleState {
  locale: LocaleType
}

const Trans = {
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
    Storage.set(LOCALE_KEY, newLocale)
  },
  get persistedLocale() {
    const persistedLocale = Storage.get(LOCALE_KEY)
    return persistedLocale || null
  },
  get browserLanguage() {
    return navigator.language ? navigator.language.replace('-', '_') : null
  }
}

export const useLocaleStore = defineStore('locale', () => {
  const state = reactive<LocaleState>({
    locale: Trans.persistedLocale
  })

  function getLocale(): LocaleType {
    return state.locale || Trans.browserLanguage || Trans.defaultLocale
  }

  function setLocale(locale: LocaleType): void {
    state.locale = locale
    Trans.persistedLocale = locale
  }

  return {
    ...state,
    getLocale,
    setLocale
  }
})

export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
