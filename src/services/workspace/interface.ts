import type { WorkspaceFormValues, WorkspaceUsers } from '@/stores/modules/workspace'

export namespace IWorkspace {
  export interface ExistEmailParam {
    inviteEmail: string
  }
  export interface ExistEmailResponse {
    inviteEmail: string
    isExist: boolean
  }

  export interface CreateWorkspaceResponse {
    workspaceId: string
    workspaceName: string
    ownerId: string
  }

  export interface CreateWorkspaceParam extends Omit<WorkspaceFormValues, 'inviteCode'> {
    uid: string
  }

  export interface ValidateInviteCodeParam {
    inviteCode: string
  }
  export interface ValidateInviteCodeResponse {
    workspaceId: string
    workspaceName: string
    uid: string
    workspaceInviteLogId: string
  }

  export interface JoinWorkspaceParam {
    uid: string
    workspaceId: string
    workspaceInviteLogId: string
    nickname: string
    originName: string
    saveName: string
    path: string
    size: number
    ext: string
  }

  export interface JoinWorkspaceResponse {
    workspaceId: string
    workspaceName: string
    uid: string
    workspaceUserId: string
    nickName: string
  }

  export interface GetWorkspaceInfoResponse {
    workspaceId: string
    workspaceName: string
    totalUserCount: number
    workspaceUsers: WorkspaceUsers[]
  }
}
