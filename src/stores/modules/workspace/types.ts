import type { Component } from 'vue'
import type { IWorkspace } from '@/services/workspace/types'

// const { t } = useI18n()

export interface WorkspaceState {
  stepType: WorkspaceStepType
  currentStep: number
  steps: WorkspaceStep[]
  nextBtnDisabled: boolean
  formValues: WorkspaceFormValues
  joinParam: JoinParamValues
  workspace: UserWorkspace | null
  selectedWorkspaceId: string
  isCompleteWorkspaceLoad: boolean
  settings: WorkspaceSettings
}

export interface Workspace {
  workspaceId: string
  workspaceName: string
}

export interface WorkspaceFormValues {
  workspaceName: string
  nickname: string
  inviteEmails: string[]
  businessTypeCode: string
  employeeScaleCode: string
  originName: string
  saveName: string
  url: string
  path: string
  size: number
  ext: string
  inviteCode: string
}

export const workspaceStepTypes = ['create', 'invite', null] as const
export type WorkspaceStepType = (typeof workspaceStepTypes)[number]

export interface JoinParamValues {
  workspaceId: string
  workspaceInviteLogId: string
  workspaceName: string
}

export interface WorkspaceUsers {
  uid: string
  nickname: string
  userImagePath: string
}

export type WorkspaceSettings = IWorkspace.WorkspaceSettings
export interface UserWorkspace {
  workspaceId: string
  workspaceName: string
  user: {
    workspaceUserId: string
    email: string
    nickname: string
    profile: string
    status: {
      label: string
      value: IWorkspace.UserStatus
    }
  }
  settings: WorkspaceSettings
}

export interface WorkspaceStep {
  title: string
  step: number
  isComplete: boolean
  isJump: boolean
  isFinal: boolean
  nextBtnText: string | null
  component: Component
}
