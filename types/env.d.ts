declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_BASE_URL: string
    readonly VITE_APP_IMAGE_URL: string
    readonly VITE_APP_ENV: string
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
export {}
