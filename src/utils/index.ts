import { DataUtil } from './dataUtil'
import { DateUtil } from './dateUtil'
import { ImageUtil } from './imageUtil'
import { IsUtil } from './isUtil'
import { StorageUtil } from './storageUtil'

export const Util: Recordable = {
  Data: DataUtil,
  Date: DateUtil,
  Image: ImageUtil,
  Storage: StorageUtil,
  Is: IsUtil
}
