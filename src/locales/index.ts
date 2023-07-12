import type { App } from 'vue'
import { useLocaleStoreWithOut } from '@/stores/modules/locale'
import { setHtmlPageLang, setLoadLocalePool } from '@/helpers/locale'
import { createI18n, type I18n, type I18nOptions } from 'vue-i18n'
import { localeMap } from './config'

// export let i18n: Awaited<I18n>

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
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
    globalInjection: true,
    allowComposition: true,
    messages: {
      [locale]: message as { [key: string]: string }
    }
  }
}

// export const getI18n: Promise<I18n> = (async () => createI18n(await createI18nOptions()))()
// getI18n.then((res) => (i18n = res))

export const getI18n = (async () => createI18n(await createI18nOptions()))()

export let i18n: Awaited<typeof getI18n>

getI18n.then((res) => (i18n = res))

// setup i18n instance with global
export async function setupI18n(app: App) {
  await getI18n
  app.use(i18n)
}
