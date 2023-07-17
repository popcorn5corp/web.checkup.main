import type { LocaleType } from '@/locales/config'

declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_BASE_URL: string
    readonly VITE_APP_IMAGE_URL: string
    readonly VITE_APP_ENV: string
    readonly VITE_DEFAULT_LOCALE: LocaleType
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
export {}
