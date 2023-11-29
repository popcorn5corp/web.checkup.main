import type { WorkspaceFormValues, WorkspaceUsers } from '@/stores/modules/workspace'

export namespace IWorkspace {
  export interface WorkspaceInfo {
    workspaceId: string
    workspaceName: string
  }
  export interface ExistEmailParam {
    inviteEmail: string
  }
  export interface ExistEmailResponse {
    inviteEmail: string
    isExist: boolean
  }

  export interface CreateWorkspaceResponse extends WorkspaceInfo {
    ownerId: string
  }

  export interface CreateWorkspaceParam extends Omit<WorkspaceFormValues, 'inviteCode'> {
    uid: string
  }

  export interface ValidateInviteCodeParam {
    inviteCode: string
  }
  export interface ValidateInviteCodeResponse extends WorkspaceInfo {
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

  export interface JoinWorkspaceResponse extends WorkspaceInfo {
    uid: string
    workspaceUserId: string
    nickName: string
  }

  export interface GetWorkspaceInfoResponse extends WorkspaceInfo {
    totalUserCount: number
    workspaceUsers: WorkspaceUsers[]
  }
}
