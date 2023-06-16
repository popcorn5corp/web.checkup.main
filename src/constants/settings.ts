/**
 * @see http://www.lingoes.net/en/translator/langcode.htm
 */
export enum Language {
  Ko = 'ko-KR',
  En = 'en-US',
  Id = 'id-ID'
}

export enum Environment {
  Development = 'development',
  Production = 'production'
}

export enum RouterMode {
  Hash = 'hash',
  History = 'history'
}

export enum TokenStorageName {
  LocalStorage = 'localStorage',
  SessionStorage = 'sessionStorage',
  Cookie = 'cookie'
}

export const DEFAULT_PRIMARY: string = '#009688'
