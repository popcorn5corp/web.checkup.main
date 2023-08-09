import { service } from '@/utils/service'

class FileManageService {
  constructor() {}

  upload(params: any) {
    return service.upload('/file/multi/upload', params)
  }
}

export default new FileManageService()
