import type { UploadProgressEvent } from 'ant-design-vue/es/vc-upload/interface'
import { service } from '@/utils/service'
import type { IFileManager } from './interface'

class FileManageService {
  constructor() {}

  upload(formData: FormData, config: any) {
    return service.upload<IFileManager.UploadResponse>('/file/multi/upload', formData, config)
  }

  download(params: any) {
    return service.download('/file/download', params)
  }
}

export default new FileManageService()
