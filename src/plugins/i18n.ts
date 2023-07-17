import type { App } from 'vue'
import i18n from '@/locales'

// setup i18n instance with global
export function setupI18n(app: App) {
  app.use(i18n)
}
