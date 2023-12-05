import { getStorageShortName } from '../env'
import { type CreateStorageParam, createStorage as create } from './storageUtil'

export type StorageOptions = Partial<CreateStorageParam>
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

const createStorageOptions = (storage: Storage, options: StorageOptions = {}): StorageOptions => {
  return {
    storage,
    prefixKey: getStorageShortName(),
    ...options
  }
}

export const WebStorage = create(createStorageOptions(window.sessionStorage))
export const createStorage = (storage: Storage = sessionStorage, options: StorageOptions = {}) => {
  return create(createStorageOptions(storage, options))
}

export const createSessionStorage = (options: StorageOptions = {}) => {
  return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}

export const createLocalStorage = (options: StorageOptions = {}) => {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}

export default WebStorage
