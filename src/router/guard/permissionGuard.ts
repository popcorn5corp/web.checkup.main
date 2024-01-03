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

    // 인증이 되지 않은 경우
    if (!token) {
      // 인증이 필요하지 않은 white-list 일 경우, 바로 진입
      if (isWhiteList(to)) {
        next()
      } else {
        // 접근 권한이 없는 페이지에 대해서는 로그인 화면으로 Refirect
        next({ path: PagePathEnum.BASE_LOGIN })
      }

      return
    }

    // 인증이 된 이후, 로그인 페이지로 이동하면 메인 페이지로 이동
    if (to.path === PagePathEnum.BASE_LOGIN) {
      return next({ path: PagePathEnum.BASE_HOME })
    }

    // 워크스페이지가 존재하지 않을 경우, 워크스페이스 정보를 조회
    if (getWorkspaceId && !getWorkspace) {
      await getUserWorkspace()
    }

    next()
  })
}
