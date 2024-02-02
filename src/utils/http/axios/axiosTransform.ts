import { useAuthStore } from '@/stores'
import type {
  AxiosError,
  AxiosHeaderValue,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import axios from 'axios'
import { unref } from 'vue'
import { useLocale } from '@/locales/hooks/useLocale'
import type { CustomAxiosRequestConfig } from './Axios'
import { checkResponseErrorStatus } from './axiosErrorStatus'

export interface AxiosTransform {
  /**
   * @description 요청 전, interceptor 처리
   */
  requestInterceptors: (
    config: InternalAxiosRequestConfig,
    options: CustomAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  /**
   * @description 요청 전, interceptor 오류 처리
   */
  requestInterceptorsCatch: (error: AxiosError) => Promise<AxiosError>
  /**
   * @description 요청 이후, interceptor 처리
   */
  responseInterceptors: (res: AxiosResponse<any>) => AxiosResponse<any>
  /**
   * @description 요청 이후 interceptor 오류 처리
   */
  responseInterceptorsCatch: (
    axiosInstance: AxiosInstance,
    error: AxiosError
  ) => Promise<AxiosError | any>
}

export const transform: AxiosTransform = {
  requestInterceptors: (config, options) => {
    const token = useAuthStore().getToken
    const { getLocale } = useLocale()
    if (token) {
      config.headers.Authorization = (
        options.authenticationScheme ? `${options.authenticationScheme} ${token}` : token
      ) as AxiosHeaderValue
    }

    const lang = unref(getLocale).split('_')[0] || 'ko'
    config.headers['Accept-Language'] = lang

    return config
  },
  requestInterceptorsCatch: (error: AxiosError) => {
    return Promise.reject(error)
  },
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res
  },
  responseInterceptorsCatch: (axiosInstance: AxiosInstance, error: AxiosError | any) => {
    console.log('Response Error :: ', error)

    if (axios.isCancel(error)) {
      console.log('axios cancel error', error)
      return Promise.reject(error)
    }

    checkResponseErrorStatus(error)

    return Promise.reject(error)
  }
}
