export interface UserModel {
  id: number
  username: string
  email: string
  phone: string
  accountLevel: string | 'SM_HQ'
  accountType: string | 'SA_MANAGER'
  enabled: boolean
  name: string
  nameVerification: boolean
  resetPassword: boolean
  secession: boolean
  signImgUrl: string
  token: string | null
}
