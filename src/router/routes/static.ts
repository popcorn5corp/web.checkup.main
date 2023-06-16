import type { RouteRecordRaw } from 'vue-router'
import { LayoutTypeEnum } from '@/stores/interface'

// export const staticRoutes: RouteRecordRaw[] = [
//   {
//     path: '/',
//     name: 'root',
//     redirect: '/home'
//   },
//   {
//     path: '/login',
//     name: 'login',
//     component: () => import('@/views/Login/index.vue')
//   },
//   {
//     path: '/layout',
//     name: 'layout',
//     component: () => import('@/layouts/index.vue')
//   }
// ]

export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/index.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/',
    name: 'dashboard-welcome',
    redirect: '/dashboard',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/Dashboard/index.vue'),
    meta: {
      layout: LayoutTypeEnum.DEFAULT
    },
    children: []
  }
]
