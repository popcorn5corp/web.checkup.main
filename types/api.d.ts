declare namespace API {
  interface ResponseData<T = any> {
    data: T
    success: boolean
    error?: ErrorResponse
  }

  interface ErrorResponse {
    code: string
    message: string
    status: number
  }

  interface RequestPage {
    page: number
    size: numbber
  }
}
