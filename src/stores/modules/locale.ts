import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { Storage } from '@/utils/storage'
import { LOCALE_KEY } from '@/enums/cacheKeyEnum'
import { localeMap, type LocaleType } from '@/locales/config'
import { store } from '@/stores'

interface LocaleState {
  locale: LocaleType
  fallbackLocale: LocaleType
}

export const useLocaleStore = defineStore('locale', () => {
  const state = reactive<LocaleState>({
    // locale: Storage.get(LOCALE_KEY, localeMap.ko_KR)
    locale: Storage.get(LOCALE_KEY),
    fallbackLocale: Storage.get(LOCALE_KEY)
  })

  function getLocale(): LocaleType {
    return state.locale ?? localeMap.ko_KR
  }

  function setLocale(locale: LocaleType): void {
    state.fallbackLocale = state.locale
    state.locale = locale
    Storage.set(LOCALE_KEY, locale)
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
