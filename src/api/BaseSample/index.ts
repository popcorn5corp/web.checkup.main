import { service } from '@/utils/service'
import type { BaseSample } from './interface'

class BaseSampleService {
  getAll() {
    return service.get<BaseSample.ResGetBaseSample>('test')
  }
}

export default new BaseSampleService()
