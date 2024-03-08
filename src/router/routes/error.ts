import { type RouteRecordRaw } from 'vue-router'
import { layoutTypes } from '@/config/default/themeConfig'

export const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'Error404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      layout: layoutTypes.pure,
      public: true
    }
  }
]
