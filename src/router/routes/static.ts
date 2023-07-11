import type { RouteRecordRaw } from 'vue-router'
import { layoutTypes } from '@/stores/interface'

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
    // name: 'dashboard',
    // redirect: '/dashboard',
    // component: () => import(/* webpackChunkName: "layout" */ '@/views/Dashboard/index.vue'),
    meta: {
      layout: layoutTypes.default
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "layout" */ '@/views/Dashboard/index.vue'),
        meta: {
          title: '대시보드'
        },
        children: []
      }
    ]
  },
  {
    path: '/fms',
    name: 'fms',
    meta: {
      layout: layoutTypes.default
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
              ),
            meta: {
              title: '설비 현황'
            }
          },
          {
            path: 'category',
            name: 'fms-facility-category',
            component: () =>
              import(
                /* webpackChunkName: "fms-facility-category" */ '@/views/FMS/Facility/FacilityCategory/index.vue'
              ),
            meta: {
              title: '설비 카테고리'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/ems',
    name: 'ems',
    meta: {
      layout: layoutTypes.default
    },
    children: [
      {
        path: '/utilities',
        name: 'ems-utilities',
        children: [
          {
            path: 'performance',
            name: 'ems-utilities-performance',
            component: () =>
              import(
                /* webpackChunkName: "ems-utilities-performance" */ '@/views/EMS/Utilities/Performance/index.vue'
              ),
            meta: {
              title: '수도광열비 실적'
            }
          },
          {
            path: 'site',
            name: 'ems-utilities-site',
            component: () =>
              import(
                /* webpackChunkName: "ems-utilities-site" */ '@/views/EMS/Utilities/Site/index.vue'
              ),
            meta: {
              title: '사업장 영업정보'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/partner',
    name: 'partner',
    meta: {
      layout: layoutTypes.default
    },
    children: [
      {
        path: 'search',
        name: 'partner-search',
        component: () =>
          import(
            /* webpackChunkName: "partner-search" */ '@/views/Partner/PartnerSearch/index.vue'
          ),
        meta: {
          title: '파트너 검색'
        }
      }
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      layout: layoutTypes.default
    },
    children: [
      {
        path: 'project',
        name: 'setting-project',
        component: () =>
          import(
            /* webpackChunkName: "setting-project" */ '@/views/Setting/SettingProject/index.vue'
          ),
        meta: {
          title: '프로젝트 설정'
        }
      },
      {
        path: 'company',
        name: 'setting-company',
        component: () =>
          import(
            /* webpackChunkName: "setting-company" */ '@/views/Setting/SettingCompany/index.vue'
          ),
        meta: {
          title: '회사 설정'
        }
      }
    ]
  },
  {
    path: '/sample',
    name: 'sample',
    meta: {
      layout: layoutTypes.default
    },
    children: [
      {
        path: 'sample',
        name: 'sample-table',
        component: () =>
          import(/* webpackChunkName: "setting-table" */ '@/views/Sample/TableSample/index.vue'),
        meta: {
          title: '테이블 샘플'
        }
      }
    ]
  }
]
