import { defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import type { WorkspaceStep, WorkspaceStepType } from './types'

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
