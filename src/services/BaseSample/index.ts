import { service } from '@/utils/service'
import type { IBaseSample, IBaseSampleService } from './interface'

class BaseSampleService implements IBaseSampleService {
  getAll(param: IBaseSample.BaseSamplesParam) {
    return service.get<IBaseSample.BaseSamples>('/sample-board/posts', param)
  }
  getOneById(boardId: string): Promise<IBaseSample.BaseSample> {
    return service.get<IBaseSample.BaseSample>(`/sample-board/posts/${boardId}`)
  }
  updateOne(param: IBaseSample.BaseSampleUpdateParam): Promise<IBaseSample.BaseSample> {
    const { boardId, ...rest } = param
    return service.put(`/sample-board/posts/${boardId}`, rest)
  }
  // createPost(): IBaseSample.Content {}
}

export default new BaseSampleService()
