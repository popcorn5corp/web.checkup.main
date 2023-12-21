import type { Router } from 'vue-router'
import { pageLoadingGuard } from './pageLoadingGuard'
import { createPermissionGuard } from './permissionGuard'

export function setupRouterGuard(router: Router) {
  createPermissionGuard(router)
  // pageLoadingGuard(router)
}
