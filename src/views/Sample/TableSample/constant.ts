import type { IBaseSample } from '@/services/BaseSample/interface'

export const getDefaultPost = (): IBaseSample.BaseSample => ({
  boardContent: '',
  boardFiles: [],
  boardId: '',
  boardTitle: '',
  createdAt: '',
  division: 'PUBLIC'
})
