import axios from 'axios'
import type { AxiosInstance } from 'axios'

export class Axios {
  private axiosInstance: AxiosInstance
  private readonly options

  constructor(options: any) {
    this.options = options
    this.axiosInstance = axios.create(options)
  }

  private setupInterceptors() {}

  uploadFile() {}
}
