import { service } from '@/utils/http'
import type { IBaseSample, SortCodesResponse } from './interface'

class BaseSampleService {
  readonly PATH: string = '/sample-board'

  constructor() {}

  getAll(param: IBaseSample.BaseSamplesParam) {
    return service.get<IBaseSample.BaseSamples>(`/sample-board/posts`, param)
  }
  getOneById(boardId: string) {
    return service.get<IBaseSample.BaseSample>(`/sample-board/posts/${boardId}`)
  }
  updateOne(param: IBaseSample.BaseSampleUpdateParam) {
    const { boardId } = param
    return service.put(`/sample-board/posts/${boardId}`, param)
  }
  createOne(param: IBaseSample.BaseSampleCreateParam) {
    return service.post<IBaseSample.Content>('/sample-board/post', param)
  }
  deleteOne(boardId: string) {
    return service.delete(`/sample-board/posts/${boardId}`)
  }
  getSortableCodes() {
    return service.get<SortCodesResponse>('/sample-board/posts/sortable-codes')
  }
  fileDwonload() {
    return service.download('/file/download')
  }
}

export default new BaseSampleService()
