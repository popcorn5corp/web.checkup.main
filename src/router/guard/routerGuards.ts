import { isNavigationFailure } from 'vue-router'
import type { RouteLocationNormalized, Router } from 'vue-router'
import type { WhiteNameList } from '@/router/constant'
// import NProgress from 'nprogress' // progress bar
import { RouteNameEnum } from '@/router/interface/index'

const defaultRoutePath = '/dashboard/welcome'

export function createRouterGuards(router: Router, whiteNameList: WhiteNameList) {
  router.beforeEach(async (to, _, next) => {
    // NProgress.start() // start progress bar
    // const userStore = useUserStore()
    // const token = Storage.get(ACCESS_TOKEN_KEY, null)
    const token = 'token'

    if (token) {
      if (to.name === RouteNameEnum.LOGIN) {
        // next({ path: defaultRoutePath })
      } else {
        const hasRoute = router.hasRoute(to.name!)
        // if (userStore.menus.length === 0) {
        //   const [err] = await _to(userStore.afterLogin())
        //   if (err) {
        //     userStore.resetToken()
        //     return next({ name: RouteNameEnum.LOGIN })
        //   }

        //   if (!hasRoute) {
        //     next({ ...to, replace: true })
        //   } else {
        //     next()
        //   }
        // } else {
        //   next()
        // }

        next()
      }
    } else {
      // not login
      if (whiteNameList.some((n) => n === to.name)) {
        next()
      } else {
        next({ name: RouteNameEnum.LOGIN, query: { redirect: to.fullPath }, replace: true })
      }
    }
  })

  const getComponentName = (route: RouteLocationNormalized) => {
    const comp = route.matched.at(-1)?.components?.default
    return comp?.name ?? (comp as any)?.type?.name
  }

  router.afterEach((to, from, failure) => {
    // const keepAliveStore = useKeepAliveStore()
    // const token = Storage.get(ACCESS_TOKEN_KEY, null)
    const token = 'token'

    if (isNavigationFailure(failure)) {
      console.error('failed navigation', failure)
    }
    const toCompName = getComponentName(to)

    if (to.meta?.keepAlive) {
      if (toCompName) {
        // keepAliveStore.add(toCompName)
      } else {
      }
    } else {
      if (toCompName) {
        // keepAliveStore.remove(toCompName)
      }
    }
    if (to.name === RouteNameEnum.REDIRECT) {
      const fromCompName = getComponentName(from)
      // fromCompName && keepAliveStore.remove(fromCompName)
    }
    if (!token) {
      // keepAliveStore.clear()
    }
    // NProgress.done() // finish progress bar
  })

  router.onError((error) => {})
}
