import { type RouteRecordRaw } from 'vue-router'
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
    name: 'root',
    redirect: '/dashboard'
  },
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
  },
  {
    path: '/workspace',
    name: 'workspace',
    component: () => import('@/views/workspace/index.vue'),
    meta: {
      title: 'Workspace',
      layout: layoutTypes.pure
    },
    children: [
      {
        path: '',
        name: 'workspace-welcome',
        component: () => import('@/views/workspace/components/Welcome.vue'),
        meta: {
          title: 'Welcome'
        }
      },
      {
        path: 'list',
        name: 'workspace-list',
        component: () => import('@/views/workspace/components/WorkspaceList.vue'),
        meta: {
          title: 'List'
        }
      },
      {
        path: 'create',
        name: 'workspace-create',
        component: () => import('@/views/workspace/components/create/index.vue'),
        meta: {
          title: 'Create'
        }
      },
      {
        path: 'invite',
        name: 'workspace-invite',
        component: () => import('@/views/workspace/components/invite/index.vue'),
        meta: {
          title: 'Invite'
        }
      }
    ]
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
        component: () => import(/* webpackChunkName: "layout" */ '@/views/dashboard/index.vue'),
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
                /* webpackChunkName: "fms-facility-status" */ '@/views/fms/facility/facility-status/index.vue'
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
                /* webpackChunkName: "fms-facility-category" */ '@/views/fms/facility/facility-category/index.vue'
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
                /* webpackChunkName: "ems-utilities-performance" */ '@/views/ems/utilities/performance/index.vue'
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
                /* webpackChunkName: "ems-utilities-site" */ '@/views/ems/utilities/site/index.vue'
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
            /* webpackChunkName: "partner-search" */ '@/views/partner/partner-search/index.vue'
          ),
        meta: {
          title: '파트너 검색'
        }
      }
    ]
  },
  // {
  //   path: '/setting',
  //   name: 'setting',
  //   meta: {
  //     layout: layoutTypes.default
  //   },
  //   children: [
  //     {
  //       path: 'project',
  //       name: 'setting-workspace',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "setting-workspace" */ '@/views/setting/setting-workspace/index.vue'
  //         ),
  //       meta: {
  //         title: '워크스페이스 설정'
  //       }
  //     }
  //   ]
  // },
  {
    path: '/manage',
    name: 'manage',
    meta: {
      layout: layoutTypes.default
    },
    component: () => import(/* webpackChunkName: "manage" */ '@/views/manage/index.vue'),
    children: [
      {
        path: 'users',
        name: 'manage-users',
        component: () =>
          import(/* webpackChunkName: "manage-users" */ '@/views/manage/manage-users/index.vue'),
        meta: {
          title: '사용자 관리'
        }
      },
      {
        path: 'group',
        name: 'manage-group',
        component: () =>
          import(/* webpackChunkName: "manage-group" */ '@/views/manage/manage-group/index.vue'),
        meta: {
          title: '그룹 관리'
        }
      }
    ]
  },
  {
    path: '/samples',
    name: 'samples',
    meta: {
      layout: layoutTypes.default
    },
    children: [
      {
        path: 'dynamic-table',
        name: 'samples-dynamic-table',
        component: () =>
          import(
            /* webpackChunkName: "simple-dynamic-table" */ '@/views/sample/table-sample/index.vue'
          ),
        meta: {
          title: 'Dynamic Table'
        }
      }
      // {
      //   path: 'accordion',
      //   name: 'samples-accordion',
      //   component: () =>
      //     import(/* webpackChunkName: "setting-table" */ '@/views/Sample/Accordian/index.vue'),
      //   meta: {
      //     title: 'Accordian'
      //   }
      // }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      layout: layoutTypes.default
    },
    children: [
      {
        path: 'table',
        name: 'components-table',
        component: () =>
          import(
            /* webpackChunkName: "components-table" */ '@/views/components-overview/table/index.vue'
          ),
        meta: {
          title: 'Table'
        }
      },
      {
        path: 'accordion',
        name: 'components-accordion',
        component: () =>
          import(
            /* webpackChunkName: "components-accordion" */ '@/views/components-overview/accordian/index.vue'
          ),
        meta: {
          title: 'Accordian'
        }
      },
      {
        path: 'modal',
        name: 'components-modal',
        component: () =>
          import(
            /* webpackChunkName: "components-modal" */ '@/views/components-overview/modal/index.vue'
          ),
        meta: {
          title: 'Modal'
        }
      },
      {
        path: 'card',
        name: 'components-card',
        component: () =>
          import(
            /* webpackChunkName: "components-card" */ '@/views/components-overview/card/index.vue'
          ),
        meta: {
          title: 'Card'
        }
      },
      {
        path: 'list',
        name: 'components-list',
        component: () =>
          import(
            /* webpackChunkName: "components-list" */ '@/views/components-overview/list/index.vue'
          ),
        meta: {
          title: 'List'
        }
      },
      {
        path: 'form',
        name: 'components-form',
        component: () =>
          import(
            /* webpackChunkName: "components-form" */ '@/views/components-overview/form/index.vue'
          ),
        meta: {
          title: 'Form'
        }
      }
    ]
  },
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
