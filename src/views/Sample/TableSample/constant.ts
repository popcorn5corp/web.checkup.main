import dayjs from 'dayjs'
import type { IBaseSample } from '@/services/BaseSample/interface'

export const getDefaultPost = (): IBaseSample.BaseSample => ({
  key: '',
  boardContent: '',
  boardFiles: [],
  boardId: '',
  boardTitle: '',
  createdAt: dayjs(),
  division: 'PUBLIC'
})
