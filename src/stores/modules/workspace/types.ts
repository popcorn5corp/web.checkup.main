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
  workspace: UserWorkspace
  selectedWorkspaceId: string
  isCompleteWorkspaceLoad: boolean
  // settings: WorkspaceSettings
  menus: IMenu[]
}

export interface Workspace {
  workspaceId: string
  workspaceName: string
}

export interface IMenu {
  path: string
  name: string
  meta: {
    title: string
    namePath: string[]
    fullPath: string
    icon?: string
    isNew?: boolean
  }
  children: IMenu[]
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

export interface WorkspaceUser {
  uid: string
  nickname: string
  userImagePath: string
}

export const workspaceSettingsCategory = [
  'account',
  'alarm',
  'display',
  'language',
  'accessibility'
] as const

export type workspaceSettingsCategoryKey = (typeof workspaceSettingsCategory)[number]

export type WorkspaceSettings = IWorkspace.WorkspaceSettings
export interface UserWorkspace {
  workspaceId: string | null
  workspaceName: string
  user: {
    workspaceUserId: string | null
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
