import { type RouteRecordRaw } from 'vue-router'
import { layoutTypes } from '@/stores/interface'

export const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'Error404',
    component: () => import('@/views/ErrorView.vue'),
    meta: {
      layout: layoutTypes.pure,
      public: true
    }
  }
]
