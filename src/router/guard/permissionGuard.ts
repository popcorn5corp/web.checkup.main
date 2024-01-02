import { useAuthStore } from '@/stores'
import type { RouteLocationNormalized, Router } from 'vue-router'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { PagePathEnum } from '@/constants/pageEnum'

const whiteListByPath: string[] = [PagePathEnum.BASE_LOGIN]
const whiteListByName: string[] = []

const isWhiteList = (to: RouteLocationNormalized) => {
  return whiteListByPath.indexOf(to.path) !== -1 || whiteListByName.indexOf(to.name as any) !== -1
}

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, _, next) => {
    const authStore = useAuthStore()
    const { getWorkspaceId, getWorkspace, getUserWorkspace } = useWorkspaceStore()
    const token = authStore.getToken

    if (!token) {
      if (isWhiteList(to)) {
        next()
      } else {
        next({ path: PagePathEnum.BASE_LOGIN })
      }

      return
    }

    if (to.path === PagePathEnum.BASE_LOGIN) {
      return next({ path: PagePathEnum.BASE_HOME })
    }

    if (getWorkspaceId && !getWorkspace) {
      await getUserWorkspace()
    }

    next()
  })
}
