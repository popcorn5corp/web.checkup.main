export namespace IAuth {
  export interface User {
    uid: string
    userId: string
    userName: string
  }

  export interface UserResponse extends User {
    workspaceCount: number
    userEmail: string
  }
}
