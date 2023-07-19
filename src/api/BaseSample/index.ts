import { service } from '@/utils/service'
import type { IBaseSample } from './interface'

class BaseSampleService {
  getAll() {
    return service.get<IBaseSample.ResGetBaseSample>('/sample-board/posts')
  }
}

export default new BaseSampleService()
