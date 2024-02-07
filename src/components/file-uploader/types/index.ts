import type { IFileManager } from '@/services/file-manager/types'

export type FileList = IFileManager.FileContent[]
export interface FileUploaderProps {
  files?: FileList
  type?: IFileManager.FileType
  readonly?: boolean // Only Read Mode
  showRemove?: boolean
  showPreview?: boolean
  showDownload?: boolean
}

export interface FileUploaderEmits {
  (event: 'change'): void
  (event: 'remove'): void
}

export type UpdateFileContent = IFileManager.UpdateFileContent
export type { UploadFile, UploadProps } from 'ant-design-vue'
export type { RcFile, UploadProgressEvent } from 'ant-design-vue/es/vc-upload/interface'
