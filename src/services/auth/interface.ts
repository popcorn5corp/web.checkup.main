export namespace IAuth {
  export const authenticationTypes = {
    PHONE: 'PHONE',
    EMAIL: 'EMAIL'
  } as const
  export type AuthenticationType = (typeof authenticationTypes)[keyof typeof authenticationTypes]

  export const certificationTypes = {
    SIGNUP: 'SIGNUP',
    EMAIL_AUTH: 'EMAIL_AUTH'
  } as const
  export type CertificationType = (typeof certificationTypes)[keyof typeof certificationTypes]

  export interface User {
    uid: string
    userId: string
    userName: string
    userEmail: string
  }

  export interface UserResponse extends User {
    workspaceCount: number
  }

  export interface UidType {
    uid: string
  }

  export interface ValidResponse {
    message: string
    code: string
  }

  export interface SignUpUser {
    userId: string
    name: string
    phone: string
    email: string
  }

  export interface SignUpParam extends SignUpUser {
    password: string
  }

  export interface SignUpResponse extends SignUpUser {
    uid: string
  }

  export interface SignInParam {
    userId: string
    password: string
  }

  export interface SignInResponse {
    accessToken: string
    refreshToken: string
    tokenType: string
    expiresIn: string
  }

  export interface FindType {
    authenticationType: AuthenticationType
    userName: string
    auth_uuid: string
    contact: ContactType
  }

  export interface ContactType {
    email?: string
    phone?: string
  }

  export interface FindIdResponse {
    userId: string[]
  }

  export interface FindPasswordParam extends FindType {
    userId: string
  }

  export interface ResetPasswordParam extends UidType {
    newPassword: string
  }

  export interface SendEmailParam {
    certificationType: CertificationType
    email: string
  }

  export interface SendEmailResponse {
    auth_uuid: string
    logKey: string
    validSec: number
    sendDate: string
  }

  export interface ValidEmailParam extends SendEmailParam {
    auth_uuid: string
    certificationNumber: string
  }

  export interface SendPhoneParam {
    certificationType: CertificationType
    phone: string
  }

  export interface ValidPhoneParam extends SendPhoneParam {
    auth_uuid: string
    certificationNumber: string
  }
}
