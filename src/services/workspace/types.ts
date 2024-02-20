import type { WorkspaceFormValues, WorkspaceUsers } from '@/stores/modules/workspace/types'
import type { LocaleType } from '@/locales/config'

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
    images: ImageFileInfo[]
  }

  export interface ImageFileInfo {
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

  export interface WorkspaceSettings {
    // 계정 설정
    account: {}
    // 알람 설정
    alarm: {}
    // 디스플레이 설정
    display: {
      themeName: 'light' | 'semiDark' | 'dark' // 워크스페이스 테마
      menuPosition: 'side' | 'top' // 메뉴 위치
      primaryColor: string // 메인 색상
      menuThemeName: 'light' | 'dark' // 메뉴 테마
    }
    // 언어 설정
    language: {
      // 사용 언어
      language: LocaleType
    }
    // 접근성 설정
    accessibility: {
      // 글자 크기
      fontSize: number
    }
  }
  export interface GetUserWorkspaceResponse {
    workspace: WorkspaceInfo
    workspaceUser: WorkspaceUserInfo
    workspaceSettings: WorkspaceSettings
  }

  export type UpdateWorkspaceSettingsParam = WorkspaceSettings
  export type UpdateWorkspaceSettingsResponse = WorkspaceSettings
}
