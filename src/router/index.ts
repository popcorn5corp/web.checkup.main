import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { whiteNameList } from './constant'
import { setupRouterGuard } from './guard'
import { createRouterGuards } from './guard/routerGuards'
import { staticRoutes } from './routes/static'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: staticRoutes,
  scrollBehavior: () => {
    return { left: 0, top: 0 }
  }
})

export async function setupRouter(app: App) {
  // createRouterGuards(router, whiteNameList)
  setupRouterGuard(router)

  app.use(router)

  await router.isReady()
}

export default router
