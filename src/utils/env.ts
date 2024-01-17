import pkg from '../../package.json'

export const envModes = {
  dev: 'development',
  prod: 'production'
} as const

export type EnvMode = (typeof envModes)[keyof typeof envModes]

export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_TITLE } = getAppEnvConfig()
  return `${VITE_GLOB_APP_TITLE.replace(/\s/g, '_')}__${getEnvMode()}`.toUpperCase()
}

/**
 * @description Version에 따른 Cache Key
 */
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase()
}

/**
 * @description environment 상태
 */
export function getEnvMode() {
  return import.meta.env.MODE as EnvMode
}

/**
 * @description development mode 여부
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV
}

/**
 * @description env 파일 variables
 */
export function getAppEnvConfig() {
  const ENV = import.meta.env

  const { VITE_GLOB_APP_TITLE, VITE_API_URL, VITE_AUTH_API_URL, VITE_DEFAULT_LOCALE } = ENV

  return {
    VITE_GLOB_APP_TITLE,
    VITE_API_URL,
    VITE_AUTH_API_URL,
    VITE_DEFAULT_LOCALE
  }
}

getAppEnvConfig()
