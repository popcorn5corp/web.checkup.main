import { useAuthStore } from '@/stores'
import type { Router } from 'vue-router'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { PagePathEnum } from '@/constants/pageEnum'

const defaultPagePath = PagePathEnum.BASE_HOME

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, _, next) => {
    const authStore = useAuthStore()
    const workspaceStore = useWorkspaceStore()
    const token = authStore.getToken
    console.log('token :: ', token)

    if (token) {
      if (to.path === PagePathEnum.BASE_LOGIN) {
        if (!workspaceStore.getWorkspace) {
          return next(false)
        } else {
          return next(defaultPagePath)
        }
      } else {
        if (to.path === PagePathEnum.BASE_HOME && !workspaceStore.getWorkspace) {
          await workspaceStore.getUserWorkspace()
        }
      }
    }

    next()
  })
}
