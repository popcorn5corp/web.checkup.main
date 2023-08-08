import type { IBaseSample } from '@/services/BaseSample/interface'
import dayjs from 'dayjs'

export const getDefaultPost = (): IBaseSample.BaseSample => ({
  key: '',
  boardContent: '',
  boardFiles: [],
  boardId: '',
  boardTitle: '',
  createdAt: dayjs(),
  division: 'PUBLIC'
})
