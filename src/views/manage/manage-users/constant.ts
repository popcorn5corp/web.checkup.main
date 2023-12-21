import type { IManageUser } from '@/services/manage-users/interface'

export const getDefaultPost = (): IManageUser.UserListRequest => ({
  nickname: '',
  email: '',
  phone: '',
  joinDate: '',
  userStatus: ''
})
