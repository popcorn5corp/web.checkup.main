import dayjs from 'dayjs'
import type { IBaseSample } from '@/services/base-sample/types'

export const getDefaultPost = (): IBaseSample.BaseSample => ({
  boardContent: '',
  boardFiles: [],
  boardId: '',
  boardTitle: '',
  createdAt: dayjs(dayjs()).unix(),
  division: { label: '', value: 'PRIVATE' },
  thumbnail: null,
  permission: { label: '', value: 'NORMAL' }
})
