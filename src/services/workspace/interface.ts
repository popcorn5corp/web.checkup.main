import type { WorkspaceFormValues, WorkspaceUsers } from '@/stores/modules/workspace'

export namespace IWorkspace {
  export interface WorkspaceInfo {
    workspaceId: string
    workspaceName: string
  }

  export interface WorkspaceListInfo extends WorkspaceInfo {
    workspaceImagePath: string
  }

  export interface UpdateDefaultWorkspceInfo {
    defaultWorkspace: boolean
    defaultWorkspaceId: string
  }

  export interface GetDefaultProfilesResponse {
    images: ImageFilesInfo[]
  }

  export interface ImageFilesInfo {
    name: string
    originName: string
    url: string
    path: string
    ext: string
    size: number
  }

  export interface WorkspaceUserInfoResponse {
    workspace: WorkspaceInfo
    workspaceUser: {
      workspaceUserId: string
      nickname: string
      email: string
      profile: string
      userStatus: LabelValue<string>
    }
  }

  export interface GetWorkspaceListParam {
    currentWorkspaceId: string | null
  }
  export interface GetWorkspaceListResponse extends UpdateDefaultWorkspceInfo {
    uid: string
    userId: string
    userName: string
    workspaceInfoList: WorkspaceListInfo[]
  }

  export interface CreateWorkspaceResponse extends WorkspaceInfo {
    ownerId: string
  }

  export interface CreateWorkspaceParam extends Omit<WorkspaceFormValues, 'inviteCode' | 'url'> {
    uid: string
  }

  export interface GetValidateInviteCodeParam {
    inviteCode: string
  }
  export interface GetValidateInviteCodeResponse extends WorkspaceInfo {
    uid: string
    workspaceInviteLogId: string
  }

  export interface GetBusinessOptResponse {
    codes: LabelValue<string>[]
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

  export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'WITHDRAWN' | 'REVOKE'
  export interface WorkspaceUserInfo {
    workspaceUserId: string
    nickname: string
    email: string
    profile: string
    userStatus: {
      label: string
      value: UserStatus
    }
  }
  export interface GetUserWorkspaceResponse {
    workspace: WorkspaceInfo
    workspaceUser: WorkspaceUserInfo
  }
}
