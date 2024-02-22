import { Helper } from '@/helpers'
import { store } from '@/stores'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import type { LocaleState } from './types'

const { locales } = Helper.Locale

export const useLocaleStore = defineStore('locale', () => {
  const state = reactive<LocaleState>({
    locale: locales.persistedLocale
  })

  const getLocale = computed(() => state.locale || locales.browserLanguage || locales.defaultLocale)

  function setLocale(locale: LocaleState['locale']): void {
    state.locale = locale
    setPersistedLocale(locale)
  }

  function setPersistedLocale(locale: LocaleState['locale']) {
    locales.persistedLocale = locale
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
