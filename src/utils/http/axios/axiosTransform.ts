import { useAuthStore } from '@/stores'
import type {
  AxiosError,
  AxiosHeaderValue,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import axios from 'axios'
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
    const token = useAuthStore().getToken()

    if (token) {
      config.headers.Authorization = (
        options.authenticationScheme ? `${options.authenticationScheme} ${token}` : token
      ) as AxiosHeaderValue
    }

    config.headers['Accept-Language'] = 'ko'

    return config
  },
  requestInterceptorsCatch: (error: AxiosError) => {
    return Promise.reject(error)
  },
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res
  },
  responseInterceptorsCatch: (axiosInstance: AxiosInstance, error: AxiosError | any) => {
    const { response, code, message, config } = error
    const msg = response

    console.log('Response Error :: ', error)

    if (axios.isCancel(error)) {
      console.log('axios cancel error', error)
      return Promise.reject(error)
    }

    const status = error?.response?.status
    checkResponseErrorStatus(status, msg)

    return Promise.reject(error)
  }
}
