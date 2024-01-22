export namespace IAuth {
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
    authenticationType: string
    userName: string
    uuid: string
  }
  export interface FindIdParam extends FindType {
    contact: {
      email: string
    }
  }

  export interface FindIdResponse {
    userId: string[]
  }

  export interface FindPasswordParam extends FindType {
    userId: string
    contact: {
      phone: string
    }
  }

  export interface FindPasswordResponse {
    // === UidType
    uid: string
  }

  export interface ResetPasswordParam extends UidType {
    newPassword: string
  }

  export interface ResetPasswordResponse {
    // === UidType
    uid: string
  }

  export interface SendEmailParam {
    certificationType: string
    email: string
  }

  export interface SendEmailResponse {
    uuid: string
    logKey: string
    validSec: number
    sendDate: string
  }

  export interface ValidEmailParam {
    certificationType: string
    email: string
    uuid: string
    certificationNumber: string
  }

  export interface ValidEmailResponse {
    // === ValidResponse
    message: string
    code: string
  }

  export interface SendPhoneParam {
    certificationType: string
    phone: string
  }

  export interface SendPhoneResponse {
    // === SendEmailResponse
    uuid: string
    logKey: string
    validSec: number
    sendDate: string
  }

  export interface ValidPhoneParam extends SendPhoneParam {
    uuid: string
    certificationNumber: string
  }

  export interface ValidPhoneResponse {
    // === ValidResponse
    message: string
    code: string
  }
}
