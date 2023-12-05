import { cloneDeep, merge } from 'lodash-es'
import { ResultEnum } from '@/constants/httpEnum'
import { ContentTypeEnum } from '@/constants/httpEnum'
import { AxiosHttpClient, type CustomAxiosRequestConfig } from './Axios'
import { type AxiosTransform, transform } from './axiosTransform'

export function checkReponseErrorStatus() {}

export function createAxios(option?: Partial<CustomAxiosRequestConfig>) {
  return new AxiosHttpClient(
    merge(
      {
        baseURL: import.meta.env.VITE_API_URL,
        timeout: ResultEnum.TIMEOUT as number,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        transform: cloneDeep(transform),
        authenticationScheme: 'Bearer'
      } as CustomAxiosRequestConfig,
      option || {}
    )
  )
}
