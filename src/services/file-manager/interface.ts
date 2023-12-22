import { fileTypes } from '@/constants/file'

export namespace IFileManager {
  export interface FileContent {
    fileId: string
    ext: string
    name: string
    originName: string
    path: string
    size: number
    url: string // domain + path
  }

  export type UpdateFileContent = PartialBy<FileContent, 'fileId'> & {
    remove?: boolean
  }

  export type FileType = (typeof fileTypes)[keyof typeof fileTypes]

  export type UploadParam = FormData
  export interface FileUploadResponse {
    files: FileContent[]
  }

  export interface DownloadParam {
    fileName: string
    fileUrl: string
  }
}
