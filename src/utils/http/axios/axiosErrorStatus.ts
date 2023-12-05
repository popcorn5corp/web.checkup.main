import { useAuthStore } from '@/stores'
import { useMessage } from '@/hooks/useMessage'

const { createMessage } = useMessage()
const errorMessage = createMessage.error

export function checkResponseErrorStatus(
  status: number,
  msg: string
  // errorMessageMode: ErrorMessageMode = 'message'
): void {
  console.log('Error Status :: ', status, msg)
  const authStore = useAuthStore()
  let errMessage = ''

  switch (status) {
    case 400:
      errMessage = `${msg}`
      break
    case 401:
      errMessage = msg || 'The user does not have permission.'
      authStore.logout()
      break
    case 403:
      errMessage = 'The user is authorized, but access is forbidden.'
      authStore.logout()
      break
    case 404:
      errMessage = 'Network request error, the resource was not found.'
      break
    case 500:
      errMessage = 'Server error, please contact the administrator.'
      break
    default:
  }

  if (errMessage) {
    errorMessage({ content: errMessage })
  }
}
