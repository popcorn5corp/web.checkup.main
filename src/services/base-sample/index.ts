import { service } from '@/utils/http'
import type { IBaseAPI } from '../base/interface'
import type { CodeResponse, IBaseSample, PermissionCodes, SortCodesResponse } from './interface'

class BaseSampleService {
  readonly PATH: string = '/workspace/sample-board'
  private _permissionCodes: PermissionCodes = []

  constructor() {
    // this.getPermissionCodes().then(({ data, success }) => {
    //   if (success) {
    //     this._permissionCodes = data.codes
    //   }
    // })
  }

  get permissionCodes() {
    return this._permissionCodes
  }

  getAll(param: IBaseSample.BaseSamplesParam) {
    return service.get<IBaseSample.BaseSamples>(this.PATH + `/posts`, param)
  }
  getOneById(boardId: string) {
    return service.get<IBaseSample.BaseSample>(this.PATH + `/posts/${boardId}`)
  }
  updateOne(param: IBaseSample.BaseSampleUpdateParam) {
    const { boardId } = param
    return service.put(this.PATH + `/posts/${boardId}`, param)
  }
  createOne(param: IBaseSample.BaseSampleCreateParam) {
    return service.post<IBaseSample.Content>(this.PATH + '/post', param)
  }
  deleteOne(boardId: string) {
    return service.delete(this.PATH + `/posts/${boardId}`)
  }
  deleteByIds(params: any) {
    return service.delete(this.PATH + '/posts', params)
  }
  getSortableCodes() {
    return service.get<SortCodesResponse>(this.PATH + '/posts/sortable-codes')
  }
  getPermissionCodes() {
    return service.get<CodeResponse>(this.PATH + '/codes').then(({ data, success }) => {
      if (success) {
        console.log('fffff ', data)
        this._permissionCodes = data.codes
      }
      // return data.codes
    })
  }
  fileDwonload() {
    return service.download('/file/download')
  }
  getPageInfo() {
    return service.get<IBaseAPI.FilterResponse>(this.PATH + '/filters')
  }
}

export default new BaseSampleService()
