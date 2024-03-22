import { type RouteRecordRaw } from 'vue-router'
import { layoutTypes } from '@/config/default/themeConfig'

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: {
      title: 'Login',
      layout: layoutTypes.pure,
      public: true
    },
    beforeEnter: () => {}
  },
  {
    path: '/social-login',
    name: 'social-login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/SocialLoginPage.vue'),
    meta: {
      title: '',
      layout: layoutTypes.pure,
      public: true
    }
  }
]
