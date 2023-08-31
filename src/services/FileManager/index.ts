import type { UploadProgressEvent } from 'ant-design-vue/es/vc-upload/interface'
import { service } from '@/utils/service'
import type { IFileManager } from './interface'

class FileManageService {
  constructor() {}

  upload(formData: IFileManager.FileUploadParam, config: any) {
    return service.upload<IFileManager.FileUploadResponse>('/file/upload', formData, config)
  }

  download(params: IFileManager.DownloadParam) {
    return service.download('/file/download', params)
  }
}

export default new FileManageService()
