// import { useI18n } from 'vue-i18n'
// const { t } = useI18n()

export const menus: any = [
  {
    path: '/dashboard',
    name: 'dashboard',
    // redirect: '/dashboard/welcome',
    // component: {
    //   name: 'LayoutParentView',
    //   __hmrId: 'f60f4a90',
    //   __file: '/Users/insukim/Desktop/Develop/vite-vue3-admin/src/layout/routerView/index.vue'
    // },
    meta: {
      // title: 'routes.dashboard.dashboard',
      title: '대시보드',
      icon: 'magnifying-glass-chart',
      namePath: ['dashboard'],
      fullPath: '/dashboard',
      isNew: true
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          // title: 'routes.dashboard.workbench',
          title: '대시보드',
          icon: 'magnifying-glass-chart',
          namePath: ['dashboard', 'dashboard'],
          fullPath: '/dashboard'
        }
      }
    ]
  },
  {
    path: '/fms',
    name: 'fms',
    // redirect: '/dashboard/welcome',
    component: {
      name: 'LayoutParentView',
      __hmrId: 'f60f4a90',
      __file: '/Users/insukim/Desktop/Develop/vite-vue3-admin/src/layout/routerView/index.vue'
    },
    meta: {
      // title: 'routes.dashboard.dashboard',
      title: 'FMS',
      icon: 'satellite-dish',
      namePath: ['fms'],
      fullPath: '/fms'
    },
    children: [
      {
        path: 'facility',
        name: 'fms-facility',
        meta: {
          // title: 'routes.dashboard.workbench',
          title: '설비 이력',
          icon: 'satellite-dish',
          namePath: ['fms', 'facility'],
          fullPath: '/fms/facility'
        },
        children: [
          {
            path: 'status',
            name: 'fms-facility-status',
            meta: {
              title: '설비 현황',
              icon: 'satellite-dish',
              namePath: ['fms', 'facility', 'status'],
              fullPath: '/fms/facility/status'
            }
          },
          {
            path: 'category',
            name: 'fms-facility-category',
            meta: {
              title: '설비 카테고리',
              icon: 'satellite-dish',
              namePath: ['fms', 'facility', 'category'],
              fullPath: '/fms/facility/category'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/ems',
    name: 'ems',
    // redirect: '/dashboard/welcome',
    component: {
      name: 'LayoutParentView',
      __hmrId: 'f60f4a90',
      __file: '/Users/insukim/Desktop/Develop/vite-vue3-admin/src/layout/routerView/index.vue'
    },
    meta: {
      // title: 'routes.dashboard.dashboard',
      title: 'EMS',
      icon: 'plug-circle-bolt',
      namePath: ['ems'],
      fullPath: '/ems'
    },
    children: [
      {
        path: 'utilities',
        name: 'ems-utilities',
        meta: {
          // title: 'routes.dashboard.workbench',
          title: '수도광열비',
          icon: 'plug-circle-bolt',
          namePath: ['ems', 'utilities'],
          fullPath: '/ems/utilities'
        },
        children: [
          {
            path: 'performance',
            name: 'ems-utilities-performance',
            meta: {
              title: '수도광열비 실적',
              icon: 'plug-circle-bolt',
              namePath: ['ems', 'utilities', 'performance'],
              fullPath: '/ems/utilities/performance'
            }
          },
          {
            path: 'site',
            name: 'ems-utilities-site',
            meta: {
              title: '사업장 영업정보',
              icon: 'plug-circle-bolt',
              namePath: ['ems', 'utilities', 'site'],
              fullPath: '/ems/utilities/site'
            }
          }
        ]
      }
    ]
  },
  // {
  //   path: '/ems',
  //   name: 'ems',
  //   // redirect: '/dashboard/welcome',
  //   component: {
  //     name: 'LayoutParentView',
  //     __hmrId: 'f60f4a90',
  //     __file: '/Users/insukim/Desktop/Develop/vite-vue3-admin/src/layout/routerView/index.vue'
  //   },
  //   meta: {
  //     // title: 'routes.dashboard.dashboard',
  //     title: 'EMS',
  //     icon: 'icon-yibiaopan',
  //     namePath: ['ems'],
  //     fullPath: '/ems'
  //   },
  //   children: [
  //     {
  //       path: 'utilities',
  //       name: 'ems-utilities',
  //       meta: {
  //         // title: 'routes.dashboard.workbench',
  //         title: '수도광열비',
  //         icon: 'icon-shouye',
  //         namePath: ['ems', 'utilities'],
  //         fullPath: '/ems/utilities'
  //       },
  //       children: [
  //         {
  //           path: 'performance',
  //           name: 'ems-utilities-performance',
  //           meta: {
  //             title: '수도광열비 실적',
  //             icon: 'icon-shouye',
  //             namePath: ['ems', 'utilities', 'performance'],
  //             fullPath: '/ems/utilities/performance'
  //           }
  //         },
  //         {
  //           path: 'site',
  //           name: 'ems-utilities-site',
  //           meta: {
  //             title: '사업장 영업정보',
  //             icon: 'icon-shouye',
  //             namePath: ['ems', 'utilities', 'site'],
  //             fullPath: '/ems/utilities/site'
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    path: '/partner',
    name: 'partner',
    // redirect: '/dashboard/welcome',
    component: {
      name: 'LayoutParentView',
      __hmrId: 'f60f4a90',
      __file: '/Users/insukim/Desktop/Develop/vite-vue3-admin/src/layout/routerView/index.vue'
    },
    meta: {
      // title: 'routes.dashboard.dashboard',
      title: '파트너',
      icon: 'handshake',
      namePath: ['partner'],
      fullPath: '/partner'
    },
    children: [
      {
        path: 'search',
        name: 'partner-search',
        meta: {
          // title: 'routes.dashboard.workbench',
          title: '파트너 검색',
          icon: 'handshake',
          namePath: ['partner', 'partner-search'],
          fullPath: '/partner/search'
        }
      }
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    // redirect: '/dashboard/welcome',
    component: {
      name: 'LayoutParentView',
      __hmrId: 'f60f4a90',
      __file: '/Users/insukim/Desktop/Develop/vite-vue3-admin/src/layout/routerView/index.vue'
    },
    meta: {
      // title: 'routes.dashboard.dashboard',
      title: '설정',
      icon: 'gears',
      namePath: ['setting'],
      fullPath: '/setting'
    },
    children: [
      {
        path: 'project',
        name: 'setting-project',
        meta: {
          // title: 'routes.dashboard.workbench',
          title: '프로젝트 설정',
          icon: 'gears',
          namePath: ['setting', 'setting-project'],
          fullPath: '/setting/project'
        }
      },
      {
        path: 'company',
        name: 'setting-company',
        meta: {
          // title: 'routes.dashboard.workbench',
          title: '회사 설정',
          icon: 'gears',
          namePath: ['setting', 'setting-company'],
          fullPath: '/setting/company'
        }
      }
    ]
  },
  {
    path: '/manage',
    name: 'manage',
    component: {
      name: 'LayoutParentView',
      __hmrId: 'f60f4a90',
      __file: '/Users/insukim/Desktop/Develop/vite-vue3-admin/src/layout/routerView/index.vue'
    },
    meta: {
      title: '관리',
      icon: 'users',
      namePath: ['manage'],
      fullPath: '/manage'
    },
    children: [
      {
        path: 'users',
        name: 'manage-users',
        meta: {
          title: '사용자 관리',
          icon: 'users',
          namePath: ['manage', 'manage-users'],
          fullPath: '/manage/users'
        }
      },
      {
        path: 'group',
        name: 'manage-group',
        meta: {
          title: '그룹 관리',
          icon: 'users',
          namePath: ['manage', 'manage-group'],
          fullPath: '/manage/group'
        }
      }
    ]
  },
  {
    path: '/samples',
    name: 'samples',
    // redirect: '/dashboard/welcome',
    meta: {
      // title: 'routes.dashboard.dashboard',
      title: 'Samples',
      icon: 'kaaba',
      namePath: ['samples'],
      fullPath: '/samples'
    },
    children: [
      {
        path: 'dynamic-table',
        name: 'samples-dynamic-table',
        meta: {
          // title: 'routes.dashboard.workbench',
          title: 'Dynamic Table',
          icon: 'kaaba',
          namePath: ['samples', 'samples-dynamic-table'],
          fullPath: '/samples/dynamic-table'
        }
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      title: 'UI Components',
      icon: 'icons',
      namePath: ['components'],
      fullPath: '/components'
    },
    children: [
      {
        path: 'table',
        name: 'components-table',
        meta: {
          title: 'Table',
          namePath: ['components', 'components-table'],
          fullPath: '/components/table'
        }
      },
      {
        path: 'accordion',
        name: 'components-accordion',
        meta: {
          title: 'Accordion',
          namePath: ['components', 'components-accordion'],
          fullPath: '/components/accordion'
        }
      },
      {
        path: 'modal',
        name: 'components-modal',
        meta: {
          title: 'Modal',
          namePath: ['components', 'components-modal'],
          fullPath: '/components/modal'
        }
      },
      {
        path: 'card',
        name: 'components-card',
        meta: {
          title: 'Card',
          namePath: ['components', 'components-card'],
          fullPath: '/components/card'
        }
      }
    ]
  }
]
