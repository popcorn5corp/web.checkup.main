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

  // interface IFilter {
  //   key: [string] | [string, string]
  //   order: number
  //   title: string
  //   type: string
  //   options?: Array<{
  //     label: string
  //     value: string | number | boolean
  //   }>
  //   selectedItems?: Arrya<{
  //     label: string
  //     value: string | number | boolean
  //   }>
  // }

  // interface FilterResponse {
  //   filters: IFilter[]
  // }
}
