import { computed, unref, nextTick } from 'vue'
import { loadLocalePool, setHtmlPageLang } from '@/helpers/locale'
import { useLocaleStoreWithOut } from '@/stores/modules/locale'
import type { LocaleType } from '@/locales/config'
import type { Locale } from 'ant-design-vue/es/locale-provider'
import i18n from '@/locales/'

interface LangModule {
  message: Recordable
  dateLocale: Recordable
  dateLocaleName: string
}

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithOut()
  i18n.global.locale.value = locale
  setHtmlPageLang(locale)
  localeStore.setLocale(locale)
}

async function loadLocaleMessages(locale: LocaleType) {
  const globalI18n = i18n.global

  if (!globalI18n.availableLocales.includes(locale)) {
    const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule
    if (!langModule) return
    const { message } = langModule
    globalI18n.setLocaleMessage(locale, message as any)
  }

  return nextTick()
}

export function useLocale() {
  const localeStore = useLocaleStoreWithOut()
  const getLocale = computed(() => localeStore.getLocale())
  const getAntdLocale = computed<Locale>(() => {
    return (i18n.global.getLocaleMessage(unref(getLocale)) as any).antdLocale
  })

  async function setLocale(locale: LocaleType) {
    const globalI18n = i18n.global
    const currentLocale = globalI18n.locale.value
    if (currentLocale === locale) {
      return locale
    }

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale)
      return locale
    }

    loadLocaleMessages(locale)
    loadLocalePool.push(locale)
    setI18nLanguage(locale)
    return locale
  }

  return {
    getLocale,
    getAntdLocale,
    setLocale
  }
}