import { ContentTypeEnum } from '@/enums/httpEnum'
import axios from 'axios'
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  noLoading?: boolean
}

export class AxiosHttpClient {
  private readonly axiosInstance: AxiosInstance
  private options: AxiosRequestConfig

  constructor(config: AxiosRequestConfig) {
    this.options = config
    this.axiosInstance = axios.create(config)
    this._setupInterceptors()
  }

  public getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  private _setupInterceptors(): void {
    /**
     * @description Set Response Interceptor
     */
    this.axiosInstance.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    /**
     * @description Set Request Interceptor
     */
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
  }

  /**
   * @description Rest APIs
   */
  public get<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.axiosInstance.get(url, { params, ..._object })
  }
  public post<T>(url: string, params?: object | string, _object = {}): Promise<T> {
    return this.axiosInstance.post(url, params, _object)
  }
  public put<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.axiosInstance.put(url, params, _object)
  }
  public delete<T>(url: string, params?: any, _object = {}): Promise<T> {
    return this.axiosInstance.delete(url, { params, ..._object })
  }
  public download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.axiosInstance.post(url, params, { ..._object, responseType: 'blob' })
  }
  public uploadFile(url: string, params?: object, _object = {}) {
    return this.axiosInstance.post(url, params, {
      ..._object,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA
      }
    })
  }

  // get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
  //   return this.axiosInstance.get(url, { params, ..._object })
  // }
  // post<T>(url: string, params?: object | string, _object = {}): Promise<ResultData<T>> {
  //   return this.axiosInstance.post(url, params, _object)
  // }
  // put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
  //   return this.axiosInstance.put(url, params, _object)
  // }
  // delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
  //   return this.axiosInstance.delete(url, { params, ..._object })
  // }
  // download(url: string, params?: object, _object = {}): Promise<BlobPart> {
  //   return this.axiosInstance.post(url, params, { ..._object, responseType: 'blob' })
  // }
  // uploadFile(url: string, params?: object, _object = {}) {
  //   return this.axiosInstance.post(url, params, {
  //     ..._object,
  //     headers: {
  //       'Content-type': ContentTypeEnum.FORM_DATA
  //     }
  //   })
  // }
}
