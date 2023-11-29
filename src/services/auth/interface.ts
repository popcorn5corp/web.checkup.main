import type { IWorkspace } from '@/services/workspace/interface'

export namespace IAuth {
  export interface UserResponse {
    uid: string
    userId: string
    userName: string
    workspaceCount: number
    workspaceInfoList: IWorkspace.WorkspaceInfo[]
  }
}
