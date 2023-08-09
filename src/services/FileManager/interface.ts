import { fileTypes } from '@/constants/file'

export namespace IFileManager {
  export interface FileContent {
    extension: string
    fileId: string
    fileOriginName: string
    fileUrl: string
    size: number
    uid: string
  }

  export type FileType = (typeof fileTypes)[keyof typeof fileTypes]
}
