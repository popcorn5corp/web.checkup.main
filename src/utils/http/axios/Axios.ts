import axios from 'axios'
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import qs from 'qs'
import { useAuthStore } from '@/stores/modules/auth'
import { ACCESS_TOKEN_KEY } from '@/constants/cacheKeyEnum'
import { ContentTypeEnum } from '@/constants/httpEnum'
import { AxiosCanceler } from './axiosCancel'
import type { AxiosTransform } from './axiosTransform'

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  noLoading?: boolean
  transform?: AxiosTransform
  authenticationScheme?: string
  requestOptions?: {
    errorMessageMode?: ErrorMessageMode
    ignoreCancelToken?: boolean
  }
}

export class AxiosHttpClient {
  private readonly axiosInstance: AxiosInstance
  private options: CustomAxiosRequestConfig

  constructor(config: CustomAxiosRequestConfig) {
    this.options = config
    this.axiosInstance = axios.create(config)
    this.axiosInstance.defaults.paramsSerializer = (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }

    this._setupInterceptors()
  }

  public getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  private _getTransform() {
    const { transform } = this.options
    return transform
  }

  private _setupInterceptors(): void {
    const transform = this._getTransform()
    const axiosInstance = this.getAxios()

    if (!transform) return

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = transform

    // const axiosCanceler = new AxiosCanceler()

    /**
     * @description Set Request Interceptor
     */
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // const requestOptions =
        //   (config as unknown as any).requestOptions ?? this.options.requestOptions
        // const ignoreCancelToken = requestOptions?.ignoreCancelToken ?? true
        // !ignoreCancelToken && axiosCanceler.addPending(config)

        return requestInterceptors(config, this.options)
      },
      (error: AxiosError) => {
        return requestInterceptorsCatch(error)
      }
    )

    /**
     * @description Set Response Interceptor
     */
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // response && axiosCanceler.removePending(response.config)

        return responseInterceptors(response).data
      },
      (error: AxiosError) => {
        return responseInterceptorsCatch(axiosInstance, error)
      }
    )
  }

  /**
   * @description Rest APIs
   */
  get<T>(url: string, params?: object, _object = {}): Promise<API.ResponseData<T>> {
    return this.axiosInstance.get(url, { params, ..._object })
  }
  post<T>(url: string, params?: object | string, _object = {}): Promise<API.ResponseData<T>> {
    return this.axiosInstance.post(url, params, _object)
  }
  put<T>(url: string, params?: object, _object = {}): Promise<API.ResponseData<T>> {
    return this.axiosInstance.put(url, params, _object)
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<API.ResponseData<T>> {
    return this.axiosInstance.delete(url, { params, ..._object })
  }
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.axiosInstance.post(url, params, { ..._object, responseType: 'blob' })
  }
  upload<T>(url: string, params?: object, _object = {}): Promise<API.ResponseData<T>> {
    return this.axiosInstance.post(url, params, {
      ..._object,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA
      }
    })
  }
}
