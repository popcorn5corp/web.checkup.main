import { type RouteRecordRaw } from 'vue-router'
import { layoutTypes } from '@/stores/interface'

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/login2',
    name: 'login2',
    component: () => import(/* webpackChunkName: "login2" */ '@/views/login/index2.vue'),
    meta: {
      title: 'Login',
      layout: layoutTypes.pure,
      public: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: {
      title: 'Login',
      layout: layoutTypes.pure,
      public: true
    }
  }
]
