import { service } from '@/utils/service'
import type { IBaseSample, IBaseSampleService } from './interface'

class BaseSampleService implements IBaseSampleService {
  getAll(params: IBaseSample.BaseSamplesParam) {
    return service.get<IBaseSample.BaseSamples>('/sample-board/posts', params)
  }
  getOneById(boardId: string): Promise<IBaseSample.BaseSample> {
    return service.get<IBaseSample.BaseSample>(`/sample-board/posts/${boardId}`)
  }
  // createPost(): IBaseSample.Content {}
}

export default new BaseSampleService()
