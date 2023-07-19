declare interface Result {
  code: string
  msg: string
}

declare interface ResultData<T = any> extends Result {
  data: T
}

declare interface ResultData<T = any> extends Result {
  data: T
}

declare interface UploadFileParams {
  // Other parameters
  data?: Recordable
  // File parameter interface field name
  name?: string
  // file name
  file: File | Blob
  // file name
  filename?: string
  [key: string]: any
}

declare interface IApiResponseData<T> {
  success: boolean
  msg: string
  data: T
}
