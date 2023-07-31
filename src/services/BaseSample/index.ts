import { service } from '@/utils/service'
import type { IBaseSample, IBaseSampleService } from './interface'
import type { AnyARecord } from 'dns'

class BaseSampleService implements IBaseSampleService {
  readonly PATH: string = '/sample-board'

  getAll(param: IBaseSample.BaseSamplesParam) {
    return service.get<IBaseSample.BaseSamples>(`/sample-board/posts`, param)
  }
  getOneById(boardId: string): Promise<IBaseSample.BaseSample> {
    return service.get<IBaseSample.BaseSample>(`/sample-board/posts/${boardId}`)
  }
  updateOne(param: IBaseSample.BaseSampleUpdateParam): Promise<IBaseSample.BaseSample> {
    const { boardId, ...rest } = param
    return service.put(`/sample-board/posts/${boardId}`, rest)
  }
  createOne(param: IBaseSample.BaseSampleCreateParam): Promise<IBaseSample.Content> {
    return service.post('/sample-board/post', param)
  }
  deleteOne(boardId: string): Promise<any> {
    return service.delete(`/sample-board/posts/${boardId}`)
  }
  getSortableCodes(): Promise<AnyARecord> {
    return service.get('/sample-board/posts/sortable-codes')
  }
}

export default new BaseSampleService()
