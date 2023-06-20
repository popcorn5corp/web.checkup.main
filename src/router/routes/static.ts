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
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/index.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // redirect: '/dashboard',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/Dashboard/index.vue'),
    meta: {
      layout: LayoutTypeEnum.DEFAULT
    }
    // children: []
  },
  {
    path: '/fms',
    name: 'fms',
    meta: {
      layout: LayoutTypeEnum.DEFAULT
    },
    children: [
      {
        path: '/facility',
        name: 'fms-facility',
        children: [
          {
            path: 'status',
            name: 'fms-facility-status',
            component: () =>
              import(
                /* webpackChunkName: "fms-facility-status" */ '@/views/FMS/Facility/FacilityStatus/index.vue'
              )
          },
          {
            path: 'category',
            name: 'fms-facility-category',
            component: () =>
              import(
                /* webpackChunkName: "fms-facility-category" */ '@/views/FMS/Facility/FacilityCategory/index.vue'
              )
          }
        ]
      }
    ]
  },
  {
    path: '/partner',
    name: 'partner',
    meta: {
      layout: LayoutTypeEnum.DEFAULT
    },
    children: [
      {
        path: 'search',
        name: 'partner-search',
        component: () =>
          import(/* webpackChunkName: "partner-search" */ '@/views/Partner/PartnerSearch/index.vue')
      }
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      layout: LayoutTypeEnum.DEFAULT
    },
    children: [
      {
        path: 'project',
        name: 'setting-project',
        component: () =>
          import(
            /* webpackChunkName: "setting-project" */ '@/views/Setting/SettingProject/index.vue'
          )
      },
      {
        path: 'company',
        name: 'setting-company',
        component: () =>
          import(
            /* webpackChunkName: "setting-company" */ '@/views/Setting/SettingCompany/index.vue'
          )
      }
    ]
  }
]
