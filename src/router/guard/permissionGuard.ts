import { useAuthStore } from '@/stores'
import type { Router } from 'vue-router'
import { getAppEnvConfig } from '@/utils/env'
import { PageEnum } from '@/constants/pageEnum'

const whitePathList = ['/login']
const defaultRoutePath = PageEnum.BASE_HOME

export function createPermissonGuard(router: Router) {
  router.beforeEach((to, _, next) => {
    const authStore = useAuthStore()
    const token = authStore.getToken
    next()
    // getAppEnvConfig()

    // if (!!token) {
    //   if (to.path === PageEnum.BASE_LOGIN) {
    //     next({ path: defaultRoutePath })
    //   } else {
    //     next()
    //   }
    // } else {
    //   return next()
    // }
  })
}
