import { getAppEnvConfig } from '../env'
import { createAxios } from './axios'

const { VITE_API_URL, VITE_AUTH_API_URL } = getAppEnvConfig()

export const service = createAxios({
  baseURL: VITE_API_URL
})

export const authService = createAxios({
  baseURL: VITE_AUTH_API_URL
})
