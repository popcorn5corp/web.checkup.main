import type { WorkspaceFormValues } from '@/stores/modules/workspace'

export namespace IWorkspace {
  export interface UserMeResponseData {
    uid: string
    userId: string
    userName: string
    workspaceCount: number
    workspaceInfoList: []
  }

  export interface ExistEmailParam {
    inviteEmail: string
  }
  export interface ExistEmailResponse {
    inviteEmail: string
    isExist: boolean
  }

  export interface WorkspaceCreateResponse {
    workspaceId: string
    workspaceName: string
    ownerId: string
  }

  export interface WorkspaceCreateParam extends Omit<WorkspaceFormValues, 'inviteCode'> {}
}
