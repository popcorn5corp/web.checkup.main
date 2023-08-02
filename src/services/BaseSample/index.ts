import { service } from '@/utils/service'
import type { IBaseSample, IBaseSampleService, SortCodesResponse } from './interface'

class BaseSampleService implements IBaseSampleService {
  readonly PATH: string = '/sample-board'

  constructor() {}

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
  getSortableCodes(): Promise<SortCodesResponse> {
    return service.get('/sample-board/posts/sortable-codes')
  }
  fileDwonload(): Promise<any> {
    return service.download('/file/download')
  }
}

export default new BaseSampleService()
