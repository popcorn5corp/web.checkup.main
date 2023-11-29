import type { IWorkspace } from '@/services/workspace/interface'

export namespace IAuth {
  export interface User {
    uid: string
    userId: string
    userName: string
  }

  export interface UserResponse extends User {
    workspaceCount: number
    workspaceInfoList: IWorkspace.WorkspaceInfo[]
  }
}
