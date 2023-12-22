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
    path: '/work',
    name: 'work',
    meta: {
      layout: layoutTypes.default
    },
    children: [
      {
        path: 'template-manage',
        name: 'work-template-manage',
        component: () =>
          import(/* webpackChunkName: "layout" */ '@/views/work/work-template-manage/index.vue'),
        meta: {
          title: '업무 템플릿 관리'
        },
        children: []
      },
      {
        path: 'work-status',
        name: 'work-work-status',
        component: () =>
          import(/* webpackChunkName: "layout" */ '@/views/work/work-status/index.vue'),
        meta: {
          title: '업무 현황'
        },
        children: []
      },
      {
        path: 'report-manage',
        name: 'work-report-manage',
        component: () =>
          import(/* webpackChunkName: "layout" */ '@/views/work/report-manage/index.vue'),
        meta: {
          title: '레포트 관리'
        },
        children: []
      }
    ]
  },
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
      },
      {
        path: 'module',
        name: 'manage-module',
        component: () =>
          import(/* webpackChunkName: "manage-group" */ '@/views/manage/manage-module/index.vue'),
        meta: {
          title: '모듈 관리'
        }
      }
    ]
  },
  {
    path: '/facility',
    name: 'facility',
    meta: {
      layout: layoutTypes.default
    },
    children: [
      {
        path: 'status',
        name: 'facility-status',
        component: () =>
          import(
            /* webpackChunkName: "manage-group" */ '@/views/fms/facility/facility-status/index.vue'
          ),
        meta: {
          title: '설비 현황'
        }
      },
      {
        path: 'category',
        name: 'facility-category',
        component: () =>
          import(
            /* webpackChunkName: "manage-group" */ '@/views/fms/facility/facility-category/index.vue'
          ),
        meta: {
          title: '카테고리 관리'
        }
      },
      {
        path: 'part',
        name: 'facility-part',
        component: () =>
          import(
            /* webpackChunkName: "manage-group" */ '@/views/fms/facility/facility-part/index.vue'
          ),
        meta: {
          title: '부품 관리'
        }
      }
      // {
      //   path: '/facility',
      //   name: 'fms-facility',
      //   children: [
      //     {
      //       path: 'status',
      //       name: 'fms-facility-status',
      //       component: () =>
      //         import(
      //           /* webpackChunkName: "fms-facility-status" */ '@/views/fms/facility/facility-status/index.vue'
      //         ),
      //       meta: {
      //         title: '설비 현황'
      //       }
      //     },
      //     {
      //       path: 'category',
      //       name: 'fms-facility-category',
      //       component: () =>
      //         import(
      //           /* webpackChunkName: "fms-facility-category" */ '@/views/fms/facility/facility-category/index.vue'
      //         ),
      //       meta: {
      //         title: '설비 카테고리'
      //       }
      //     }
      //   ]
      // }
    ]
  },
  {
    path: '/purchase',
    name: 'purchase',
    meta: {
      layout: layoutTypes.default
    },
    component: () => import(/* webpackChunkName: "manage" */ '@/views/manage/index.vue'),
    children: [
      {
        path: 'apply-status',
        name: 'purchase-apply-status',
        component: () =>
          import(/* webpackChunkName: "manage-users" */ '@/views/purchase/apply-status/index.vue'),
        meta: {
          title: '신청 현황'
        }
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
  // {
  //   path: '/partner',
  //   name: 'partner',
  //   meta: {
  //     layout: layoutTypes.default
  //   },
  //   children: [
  //     {
  //       path: 'search',
  //       name: 'partner-search',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "partner-search" */ '@/views/partner/partner-search/index.vue'
  //         ),
  //       meta: {
  //         title: '파트너 검색'
  //       }
  //     }
  //   ]
  // },
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
      },
      {
        path: 'search-select',
        name: 'components-search-select',
        component: () =>
          import(
            /* webpackChunkName: "components-search-select" */ '@/views/components-overview/search-select/index.vue'
          ),
        meta: {
          title: 'SearchSelect'
        }
      }
    ]
  }
]
