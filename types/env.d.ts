import type { LocaleType } from '@/locales/config'

declare global {
  interface ImportMetaEnv {
    readonly VITE_GLOB_APP_TITLE: string
    readonly VITE_APP_BASE_URL: string
    readonly VITE_APP_IMAGE_URL: string
    readonly VITE_APP_ENV: string
    readonly VITE_DEFAULT_LOCALE: LocaleType
    readonly VITE_API_URL: string
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
export {}


// declare const __APP_INFO__: {
//   pkg: {
//     name: string;
//     version: string;
//     dependencies: Recordable<string>;
//     devDependencies: Recordable<string>;
//   };
//   lastBuildTime: string;
// };