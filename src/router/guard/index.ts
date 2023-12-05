import type { Router } from 'vue-router'
import { pageLoadingGuard } from './pageLoadingGuard'
import { createPermissonGuard } from './permissionGuard'

export function setupRouterGuard(router: Router) {
  createPermissonGuard(router)
  pageLoadingGuard(router)
}
