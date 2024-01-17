import { createAxios } from './axios'

export const service = createAxios({
  baseURL: import.meta.env.VITE_API_URL
})

export const authService = createAxios({
  baseURL: import.meta.env.VITE_AUTH_API_URL
})
