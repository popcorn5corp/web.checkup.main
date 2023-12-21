import { useAuthStore } from '@/stores'
import { Util } from '@/utils'
import type { Router } from 'vue-router'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { ACCESS_TOKEN_KEY, WORKSPACE_ID_KEY } from '@/constants/cacheKeyEnum'
import { PagePathEnum } from '@/constants/pageEnum'

const defaultPagePath = PagePathEnum.BASE_HOME

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, _, next) => {
    const { getWorkspace, getWorkspaceId, getUserWorkspace } = useWorkspaceStore()
    const token = Util.Storage.get(ACCESS_TOKEN_KEY)
    const cacheWorkspaceId = Util.Storage.get(WORKSPACE_ID_KEY)
    // console.log('token :: ', token)
    // console.log('getWorkspaceId :: ', getWorkspaceId)
    // console.log('cacheWorkspaceId :: ', cacheWorkspaceId)
    // console.log('getWorkspace :: ', getWorkspace)
    // console.log('to path :: ', to.path)

    if (token) {
      if (to.path === PagePathEnum.BASE_LOGIN) {
        if (!getWorkspace) {
          return next(PagePathEnum.BASE_LOGIN)
        } else {
          return next(defaultPagePath)
        }
      } else if (!getWorkspace && getWorkspaceId) {
        await getUserWorkspace()
      } else if (!getWorkspace && cacheWorkspaceId) {
        await getUserWorkspace(cacheWorkspaceId)
      }
    }

    next()
  })
}
