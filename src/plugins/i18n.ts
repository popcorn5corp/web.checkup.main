import i18n from '@/locales'
import type { App } from 'vue'

// setup i18n instance with global
export function setupI18n(app: App<Element>) {
  app.use(i18n)
}
