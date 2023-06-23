const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

export const createStorage = ({ prefixKey = '', storage = window.localStorage } = {}) => {
  class Storage {
    storage = storage
    prefixKey?: string = prefixKey

    constructor() {}

    getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase()
    }

    set(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
      this.storage.setItem(
        this.getKey(key),
        JSON.stringify({
          value,
          expire
        })
      )
    }

    get(key: string) {
      const item = this.storage.getItem(this.getKey(key))

      if (item) {
        const data = JSON.parse(item)
        const { value, expire } = data

        // if (expire === null || expire >= Date.now()) {
        return value
        // }
      }
    }
  }

  return new Storage()
}

export const Storage = createStorage()
export default Storage
