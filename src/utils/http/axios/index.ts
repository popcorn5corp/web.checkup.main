import type { AxiosRequestConfig } from 'axios'
import { AxiosHttpClient } from './Axios'
import { ResultEnum } from '@/enums/httpEnum'

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: ResultEnum.TIMEOUT as number,
  // withCredentials: true
}

export default new AxiosHttpClient(config)
