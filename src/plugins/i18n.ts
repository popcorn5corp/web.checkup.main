import type { App } from 'vue'
import { getI18n, i18n } from '@/locales'

// setup i18n instance with global
export async function setupI18n(app: App) {
  await getI18n
  app.use(i18n)
}
