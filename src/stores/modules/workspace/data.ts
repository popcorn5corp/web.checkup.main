import { defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_MENU_POSITION,
  DEFAULT_MENU_THEME_NAME,
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_THEME_NAME
} from '@/config/default/themeConfig'
import type {
  WorkspaceFormValues,
  WorkspaceSettings,
  WorkspaceStep,
  WorkspaceStepType
} from './types'

export const getStepsInfo = (stepType: WorkspaceStepType): WorkspaceStep[] => {
  const { t } = useI18n()

  if (stepType === 'create') {
    return [
      {
        title: 'workspaceName',
        step: 1,
        isComplete: false,
        isJump: false,
        isFinal: false,
        nextBtnText: t('component.button.next'),
        component: defineAsyncComponent(
          () => import('@/views/workspace/components/create/WorkspaceNameForm.vue')
        )
      },
      {
        title: 'nameProfile',
        step: 2,
        isComplete: false,
        isJump: false,
        isFinal: false,
        nextBtnText: t('component.button.next'),
        component: defineAsyncComponent(
          () => import('@/views/workspace/components/NameProfileForm.vue')
        )
      },
      {
        title: 'inviteMember',
        step: 3,
        isComplete: false,
        isJump: true,
        isFinal: false,
        nextBtnText: t('component.button.next'),
        component: defineAsyncComponent(
          () => import('@/views/workspace/components/create/InviteMemberForm.vue')
        )
      },
      {
        title: 'buisnessType',
        step: 4,
        isComplete: true,
        isJump: false,
        isFinal: false,
        nextBtnText: t('component.button.complete'),
        component: defineAsyncComponent(
          () => import('@/views/workspace/components/create/BuisnessTypeForm.vue')
        )
      },
      {
        title: 'createComplete',
        step: 5,
        isComplete: false,
        isJump: false,
        isFinal: true,
        nextBtnText: null,
        component: defineAsyncComponent(
          () => import('@/views/workspace/components/create/CreateComplete.vue')
        )
      }
    ]
  } else {
    return [
      {
        title: 'inviteCode',
        step: 1,
        isComplete: false,
        isJump: false,
        isFinal: false,
        nextBtnText: t('component.button.next'),
        component: defineAsyncComponent(
          () => import('@/views/workspace/components/invite/InviteCodeForm.vue')
        )
      },
      {
        title: 'nameProfile',
        step: 2,
        isComplete: true,
        isJump: false,
        isFinal: false,
        nextBtnText: t('component.button.joined'),
        component: defineAsyncComponent(
          () => import('@/views/workspace/components/NameProfileForm.vue')
        )
      },
      {
        title: 'inviteComplete',
        step: 3,
        isComplete: false,
        isJump: false,
        isFinal: true,
        nextBtnText: null,
        component: defineAsyncComponent(
          () => import('@/views/workspace/components/invite/JoinComplete.vue')
        )
      }
    ]
  }
}

export function getDefaultFormValues(): WorkspaceFormValues {
  return {
    workspaceName: '', // 워크스페이스 이름
    nickname: '', // 유저가 설정한 이름
    inviteEmails: [], // 	초대 유저 email
    businessTypeCode: '', // 업종코드
    employeeScaleCode: '', // 회사 규모
    originName: '', // 프로필 이미지 이름
    saveName: '', // 서버에 저장된 파일 이름
    url: '', // 파일 url
    path: '', // 파일 path
    size: 0, // 파일 size
    ext: '', // 파일 확장자
    inviteCode: '' // 초대코드
  }
}

export function getDefaultWorkspaceSettings(): WorkspaceSettings {
  return {
    account: {},
    alarm: {},
    display: {
      themeName: DEFAULT_THEME_NAME,
      menuPosition: DEFAULT_MENU_POSITION,
      primaryColor: DEFAULT_PRIMARY_COLOR,
      menuThemeName: DEFAULT_MENU_THEME_NAME
    },
    language: {
      language: 'ko_KR'
    },
    accessibility: {
      fontSize: DEFAULT_FONT_SIZE
    }
  }
}
