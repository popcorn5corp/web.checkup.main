import type { WorkspaceFormValues, WorkspaceUsers } from '@/stores/modules/workspace'

export namespace IWorkspace {
  export interface WorkspaceInfo {
    workspaceId: string
    workspaceName: string
  }

  export interface WorkspaceListInfo extends WorkspaceInfo {
    workspaceImagePath: string
  }

  export interface DefaultWorkspceInfo {
    defaultWorkspace: boolean
    defaultWorkspaceId: string
  }

  export interface DefaultProfilesResponse {
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
      userStatus: {
        label: string
        value: string
      }
    }
  }

  export interface WorkspaceListParam {
    currentWorkspaceId: string | null
  }
  export interface WorkspaceListResponse extends DefaultWorkspceInfo {
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

  export interface ValidateInviteCodeParam {
    inviteCode: string
  }
  export interface ValidateInviteCodeResponse extends WorkspaceInfo {
    uid: string
    workspaceInviteLogId: string
  }

  export interface BusinessOptResponse {
    codes: BusinessOptionType[]
  }

  export interface BusinessOptionType {
    label: string
    value: string
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
  export interface UserWorkspaceResponse {
    workspace: WorkspaceInfo
    workspaceUser: WorkspaceUserInfo
  }
}
