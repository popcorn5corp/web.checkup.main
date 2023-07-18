import { ContentTypeEnum } from '@/enums/httpEnum'
import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  noLoading?: boolean
}

export class Axios {
  private axiosInstance: AxiosInstance
  private options: AxiosRequestConfig

  constructor(config: AxiosRequestConfig) {
    this.options = config
    this.axiosInstance = axios.create(config)
    this.setupInterceptors()
  }

  getAxios() {
    return this.axiosInstance
  }

  setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.axiosInstance.get(url, { params, ..._object })
  }
  post<T>(url: string, params?: object | string, _object = {}): Promise<ResultData<T>> {
    return this.axiosInstance.post(url, params, _object)
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.axiosInstance.put(url, params, _object)
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.axiosInstance.delete(url, { params, ..._object })
  }
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.axiosInstance.post(url, params, { ..._object, responseType: 'blob' })
  }
  uploadFile(url: string, params?: object, _object = {}) {
    return this.axiosInstance.post(url, params, {
      ..._object,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA
      }
    })
  }
}
