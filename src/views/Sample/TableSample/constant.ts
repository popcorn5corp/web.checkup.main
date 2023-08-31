import dayjs from 'dayjs'
import type { IBaseSample } from '@/services/BaseSample/interface'

export const getDefaultPost = (): IBaseSample.BaseSample => ({
  boardContent: '',
  boardFiles: [],
  boardId: '',
  boardTitle: '',
  createdAt: dayjs(dayjs()).unix(),
  division: 'PUBLIC'
})
