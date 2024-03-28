import type { IManageUser } from '@/services/manage-users/types'

export const getDefaultPost = () => ({
  detail: {
    workspaceUserId: '',
    nickname: '',
    email: '',
    phone: '',
    joinDate: '',
    userStatus: { label: '', value: '' },
    thumbnail: {
      url: ''
    }
  },
  groups: [] as IManageUser.GroupData[]
})
