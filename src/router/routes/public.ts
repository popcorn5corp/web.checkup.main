import { type RouteRecordRaw } from 'vue-router'
import { layoutTypes } from '@/stores/interface'

export const publicRoutes: RouteRecordRaw[] = [
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
