export namespace IWorkspace {
  export interface UserMeResponseData {
    name: string
    uid: string
    userId: string
    workspaceIds: string[]
  }
  // omit
  export interface WorkspaceCreateParam {
    workspaceName: string
    nickname: string
    inviteEmails?: string[]
    businessTypeCode: string
    employeeScaleCode: string
    originName: string
    saveName: string
    path: string
    size: number
    ext: string
  }

  export interface WorkspaceCreateResponse {
    workspaceId: string
    workspaceName: string
    ownerId: string
  }
}
