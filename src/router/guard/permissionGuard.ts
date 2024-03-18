import { storeToRefs } from 'pinia'
import { unref } from 'vue'
import type { RouteLocationNormalized, Router } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { PagePathEnum } from '@/constants/pageEnum'

const whiteListByPath: string[] = [PagePathEnum.BASE_LOGIN, '/social-login']
const whiteListByName: string[] = ['login', 'social-login']

const isWhiteList = (to: RouteLocationNormalized) => {
  return whiteListByPath.indexOf(to.path) !== -1 || whiteListByName.indexOf(to.name as any) !== -1
}

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()
    const workspaceStore = useWorkspaceStore()
    const { getUser, getToken } = storeToRefs(authStore)
    const { getWorkspace, getWorkspaceId } = storeToRefs(workspaceStore)
    const token = unref(getToken)

    if (!token) {
      // 인증이 필요하지 않은 화면으로 이동할 경우
      if (isWhiteList(to)) return next()

      // 로그인 페이지에서 뒤로가기 할 경우, 네비게이션 중단
      if (from.fullPath === PagePathEnum.BASE_LOGIN) return next(false)

      // 인증이 필요한 화면으로 이동할 경우, 로그인 화면으로 Refirect
      return next(PagePathEnum.BASE_LOGIN)
    }

    // 로그인 페이지로 이동할 경우, 메인 페이지로 이동
    if (to.path === PagePathEnum.BASE_LOGIN) return next(PagePathEnum.BASE_HOME)

    // 로그인 계정 정보 없을 경우
    if (!unref(getUser).userId) {
      await authStore.afterLoginAction()
    }

    // 워크스페이지가 존재하지 않을 경우
    if (unref(getWorkspaceId) && !unref(getWorkspace).workspaceId)
      await workspaceStore.getUserWorkspace()

    next()
  })
}
