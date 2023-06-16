import { isNavigationFailure } from 'vue-router'
// import NProgress from 'nprogress' // progress bar
import { RouteNameEnum } from '@/router/interface/index'
import type { WhiteNameList } from '@/router/constant'
import type { Router, RouteLocationNormalized } from 'vue-router'
// import { useUserStore } from '@/store/modules/user'
// import { useKeepAliveStore } from '@/store/modules/keepAlive'‰
// import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum'
// import { Storage } from '@/utils/Storage'
// import { to as _to } from '@/utils/awaitTo'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

const defaultRoutePath = '/dashboard/welcome'

export function createRouterGuards(router: Router, whiteNameList: WhiteNameList) {
  router.beforeEach(async (to, _, next) => {
    // NProgress.start() // start progress bar
    // const userStore = useUserStore()
    // const token = Storage.get(ACCESS_TOKEN_KEY, null)
    const token = 'token'

    if (token) {
      if (to.name === RouteNameEnum.LOGIN) {
        next({ path: defaultRoutePath })
      } else {
        const hasRoute = router.hasRoute(to.name!)

        console.log('hasRoute >> ', hasRoute)
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
    console.log('getComponentName >> ', route)
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

    console.log('toCompName >> ', toCompName)
    if (to.meta?.keepAlive) {
      if (toCompName) {
        // keepAliveStore.add(toCompName)
      } else {
        console.warn(
          `${to.fullPath}页面组件的keepAlive为true但未设置组件名，会导致缓存失效，请检查`
        )
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

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
