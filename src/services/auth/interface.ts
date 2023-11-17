export namespace IAuth {
  export interface UserResponse {
    uid: string
    userId: string
    userName: string
    workspaceCount: number
    workspaceInfoList: WorkspaceInfo[]
  }

  export interface WorkspaceInfo {
    workspaceId: string
    workspaceName: string
  }
}
