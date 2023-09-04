import type { UploadProgressEvent } from 'ant-design-vue/es/vc-upload/interface'
import { service } from '@/utils/service'
import type { IFileManager } from './interface'

class FileManagerService {
  private readonly PATH = '/file'

  constructor() {}

  upload(formData: IFileManager.UploadParam, config: Object) {
    return service.upload<IFileManager.FileUploadResponse>(this.PATH + '/upload', formData, config)
  }

  download(params: IFileManager.DownloadParam) {
    return service.download('/file/download', params)
  }
}

export default new FileManagerService()
