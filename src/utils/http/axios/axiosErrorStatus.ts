import type { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/modules/auth'
import { useMessage } from '@/hooks/useMessage'

const { createMessage } = useMessage()
const errorMessage = createMessage.error

export function checkResponseErrorStatus(
  error: AxiosError | any
  // errorMessageMode: ErrorMessageMode = 'message'
): void {
  const { response, code, message, config } = error
  const status = response?.status
  const msg = response?.data?.error?.message || message
  console.log('[ERROR] status / message :: ', status, msg)

  const authStore = useAuthStore()
  let errMessage = ''

  switch (status) {
    case 400:
      errMessage = `${msg}`
      break
    case 401:
      errMessage = msg || 'The user does not have permission.'
      authStore.logout(true)
      break
    case 403:
      errMessage = msg || 'The user is authorized, but access is forbidden.'
      authStore.logout(true)
      break
    case 404:
      errMessage = msg || 'Network request error, the resource was not found.'
      break
    case 500:
      errMessage = msg || 'Server error, please contact the administrator.'
      break
    default:
  }

  if (errMessage) {
    errorMessage({ content: errMessage })
  }

  error.message = errMessage
}
