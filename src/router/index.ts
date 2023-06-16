import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { staticRoutes } from './routes/static'
import { whiteNameList } from './constant'
import { createRouterGuards } from './guard/routerGuards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes]
})

export async function setupRouter(app: App) {
  createRouterGuards(router, whiteNameList)

  app.use(router)

  await router.isReady()
}

export default router
