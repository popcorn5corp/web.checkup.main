import { service } from '@/utils/service'
import type { IBaseSample, IBaseSampleService } from './interface'

class BaseSampleService implements IBaseSampleService {
  getAll() {
    return service.get<IBaseSample.IBaseSamples>('/sample-board/posts')
  }
  // getOneById(id: number): IBaseSample.Content {}
  // createPost(): IBaseSample.Content {}
}

export default new BaseSampleService()
