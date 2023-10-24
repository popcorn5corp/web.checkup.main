import type { AxiosRequestConfig } from 'axios'
import { ResultEnum } from '@/constants/httpEnum'
import { AxiosHttpClient } from './Axios'

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: ResultEnum.TIMEOUT as number
  // withCredentials: true
}

export default new AxiosHttpClient(config)
