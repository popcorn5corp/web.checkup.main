import i18n from '@/locales'
import { store } from '@/stores'
import { Util } from '@/utils'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { LOCALE_KEY } from '@/constants/cacheKeyEnum'
import type { LocaleState } from './types'

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
    Util.Storage.set(LOCALE_KEY, newLocale)
  },
  get persistedLocale() {
    const persistedLocale = Util.Storage.get(LOCALE_KEY)
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

  const getLocale = computed(() => state.locale || Trans.browserLanguage || Trans.defaultLocale)

  function setLocale(locale: LocaleState['locale']): void {
    state.locale = locale
    Trans.persistedLocale = locale
  }

  function setPersistedLocale(locale: LocaleState['locale']) {
    Trans.persistedLocale = locale
  }

  return {
    ...state,
    getLocale,
    setLocale,
    setPersistedLocale
  }
})

export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
