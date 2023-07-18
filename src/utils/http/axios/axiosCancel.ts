import type { AxiosRequestConfig } from 'axios'

const pendingMap = new Map<string, AbortController>()

const getPendingUrl = (config: AxiosRequestConfig): string => {
  return [config.method, config.url].join('&')
}

export class AxiosCanceler {
  public addPending(config: AxiosRequestConfig): void {
    this.removePending(config)
    const url = getPendingUrl(config)
    const controller = new AbortController()
    config.signal = config.signal || controller.signal
    if (!pendingMap.has(url)) {
      // 如果当前请求不在等待中，将其添加到等待中
      pendingMap.set(url, controller)
    }
  }

  public removeAllPending(): void {
    pendingMap.forEach((abortController) => {
      if (abortController) {
        abortController.abort()
      }
    })
    this.reset()
  }

  public removePending(config: AxiosRequestConfig): void {
    const url = getPendingUrl(config)
    if (pendingMap.has(url)) {
      // 如果当前请求在等待中，取消它并将其从等待中移除
      const abortController = pendingMap.get(url)
      if (abortController) {
        abortController.abort(url)
      }
      pendingMap.delete(url)
    }
  }

  public reset(): void {
    pendingMap.clear()
  }
}
