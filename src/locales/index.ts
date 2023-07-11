import type { App } from 'vue'
import { useLocaleStoreWithOut } from '@/stores/modules/locale'
import { setHtmlPageLang, setLoadLocalePool } from '@/helpers/locale'
import { createI18n, type I18n, type I18nOptions } from 'vue-i18n'
import { localeMap } from './config'

export let i18n: Awaited<I18n>

async function createI18nOptions(): Promise<I18nOptions> {
  const localeStore = useLocaleStoreWithOut()
  const locale = localeStore.getLocale()
  const defaultLocale = await import(`./lang/${locale}.ts`)
  const message = defaultLocale.default?.message ?? {}

  setHtmlPageLang(locale)
  setLoadLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale)
  })

  return {
    locale,
    legacy: false,
    fallbackLocale: localeMap.ko_KR, // set fallback locale
    messages: {
      [locale]: message as { [key: string]: string }
    },
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
    globalInjection: true,
    allowComposition: true
  }
}

export const getI18n: Promise<I18n> = (async () => createI18n(await createI18nOptions()))()
getI18n.then((res) => (i18n = res))
