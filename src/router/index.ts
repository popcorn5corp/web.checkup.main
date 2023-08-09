import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { whiteNameList } from './constant'
import { createRouterGuards } from './guard/routerGuards'
import { staticRoutes } from './routes/static'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: [...staticRoutes]
})

export async function setupRouter(app: App) {
  createRouterGuards(router, whiteNameList)

  app.use(router)

  await router.isReady()
}

export default router
