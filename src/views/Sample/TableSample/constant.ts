import type { IBaseSample } from '@/services/BaseSample/interface'

export const getDefaultPost = (): IBaseSample.BaseSample => ({
  key: '',
  boardContent: '',
  boardFiles: [],
  boardId: '',
  boardTitle: '',
  createdAt: '',
  division: 'PUBLIC'
})
