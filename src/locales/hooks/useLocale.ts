import { Helper } from '@/helpers'
import type { Locale } from 'ant-design-vue/es/locale-provider'
import { computed, nextTick, unref } from 'vue'
import { useLocaleStoreWithOut } from '@/stores/modules/locale'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import i18n from '@/locales/'
import type { LocaleType } from '@/locales/config'

interface LangModule {
  message: Recordable
  dateLocale: Recordable
  dateLocaleName: string
}

export const useLocale = () => {
  const { setWorkspaceSettings } = useWorkspaceStore()
  const localeStore = useLocaleStoreWithOut()
  const getLocale = computed(() => localeStore.getLocale)
  const getAntdLocale = computed<Locale>(() => {
    return (i18n.global.getLocaleMessage(unref(getLocale)) as any).antdLocale
  })

  async function _loadLocaleMessages(locale: LocaleType) {
    const globalI18n = i18n.global

    if (!globalI18n.availableLocales.includes(locale)) {
      const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule
      if (!langModule) return
      const { message } = langModule
      globalI18n.setLocaleMessage(locale, message as any)
    }

    return nextTick()
  }

  function setI18nLanguage(locale: LocaleType) {
    _loadLocaleMessages(locale)

    const localeStore = useLocaleStoreWithOut()
    i18n.global.locale.value = locale
    Helper.Locale.setHtmlPageLang(locale)
    localeStore.setLocale(locale)
  }

  // async function setLocale(locale: LocaleType) {
  //   const globalI18n = i18n.global
  //   const currentLocale = globalI18n.locale.value
  //   if (currentLocale === locale) {
  //     return locale
  //   }

  //   if (Helper.Locale.loadLocalePool.includes(locale)) {
  //     setI18nLanguage(locale)
  //     return locale
  //   }

  //   // loadLocaleMessages(locale)
  //   Helper.Locale.loadLocalePool.push(locale)
  //   setI18nLanguage(locale)
  //   return locale
  // }

  async function setLocale(locale: LocaleType) {
    return setWorkspaceSettings({
      language: {
        language: locale
      }
    }).then((res) => {
      console.log('res ', res)
      setPersistedLocale(locale)
    })
  }

  function setPersistedLocale(locale: LocaleType) {
    localeStore.setPersistedLocale(locale)
  }

  return {
    getLocale,
    getAntdLocale,
    setLocale,
    setPersistedLocale,
    setI18nLanguage
  }
}
