import i18n from '@/locales'

const { t } = i18n.global
export const menus: any = [
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      // title: 'routes.dashboard.dashboard',
      title: t('data.menu.dashboard'),
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
          title: t('data.menu.dashboard'),
          namePath: ['dashboard', 'dashboard'],
          fullPath: '/dashboard'
        }
      }
    ]
  },
  {
    path: '/work',
    name: 'work',
    meta: {
      title: t('data.menu.work'),
      icon: 'satellite-dish',
      namePath: ['work'],
      fullPath: '/work'
    },
    children: [
      {
        path: 'template-manage',
        name: 'work-template-manage',
        meta: {
          title: t('data.menu.workTemplateManage'),
          namePath: ['work', 'template-manage'],
          fullPath: '/work/template-manage'
        }
      },
      {
        path: 'work-status',
        name: 'work-work-status',
        meta: {
          title: t('data.menu.workStatus'),
          namePath: ['work', 'work-status'],
          fullPath: '/work/work-status'
        }
      },
      {
        path: 'report-manage',
        name: 'work-report-manage',
        meta: {
          title: t('data.menu.reportManage'),
          namePath: ['work', 'report-manage'],
          fullPath: '/work/report-manage'
        }
      }
    ]
  },
  {
    path: '/facility',
    name: 'facility',
    // redirect: '/dashboard/welcome',
    component: {
      name: 'LayoutParentView',
      __hmrId: 'f60f4a90',
      __file: '/Users/insukim/Desktop/Develop/vite-vue3-admin/src/layout/routerView/index.vue'
    },
    meta: {
      // title: 'routes.dashboard.dashboard',
      title: t('data.menu.facility'),
      icon: 'plug-circle-bolt',
      namePath: ['facility'],
      fullPath: '/facility'
    },
    children: [
      {
        path: 'status',
        name: 'facility-status',
        meta: {
          title: t('data.menu.facilityStatus'),
          namePath: ['facility', 'facility-status'],
          fullPath: '/facility/facility-status'
        }
      },
      {
        path: 'category',
        name: 'facility-category',
        meta: {
          title: t('data.menu.facilityCategory'),
          namePath: ['facility', 'facility-category'],
          fullPath: '/facility/facility-category'
        }
      },
      {
        path: 'part',
        name: 'facility-part',
        meta: {
          title: t('data.menu.facilityPart'),
          namePath: ['facility', 'facility-part'],
          fullPath: '/facility/facility-part'
        }
      }
    ]
  },
  {
    path: '/purchase',
    name: 'purchase',
    component: {
      name: 'LayoutParentView',
      __hmrId: 'f60f4a90',
      __file: '/Users/insukim/Desktop/Develop/vite-vue3-admin/src/layout/routerView/index.vue'
    },
    meta: {
      title: t('data.menu.purchase'),
      icon: 'handshake',
      namePath: ['purchase'],
      fullPath: '/purchase'
    },
    children: [
      {
        path: 'apply-status',
        name: 'purchase-apply-status',
        meta: {
          title: t('data.menu.applyStatus'),
          namePath: ['purchase', 'apply-status'],
          fullPath: '/purchase/apply-status'
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
      title: t('data.menu.manage'),
      icon: 'users',
      namePath: ['manage'],
      fullPath: '/manage'
    },
    children: [
      {
        path: 'users',
        name: 'manage-users',
        meta: {
          title: t('data.menu.manageUsers'),
          namePath: ['manage', 'manage-users'],
          fullPath: '/manage/users'
        }
      },
      {
        path: 'group',
        name: 'manage-group',
        meta: {
          title: t('data.menu.manageGroup'),
          namePath: ['manage', 'manage-group'],
          fullPath: '/manage/group'
        }
      },
      {
        path: 'module',
        name: 'manage-module',
        meta: {
          title: t('data.menu.manageModule'),
          namePath: ['manage', 'manage-module'],
          fullPath: '/manage/module'
        }
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
  //     icon: 'plug-circle-bolt',
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
  //         icon: 'plug-circle-bolt',
  //         namePath: ['ems', 'utilities'],
  //         fullPath: '/ems/utilities'
  //       },
  //       children: [
  //         {
  //           path: 'performance',
  //           name: 'ems-utilities-performance',
  //           meta: {
  //             title: '수도광열비 실적',
  //             icon: 'plug-circle-bolt',
  //             namePath: ['ems', 'utilities', 'performance'],
  //             fullPath: '/ems/utilities/performance'
  //           }
  //         },
  //         {
  //           path: 'site',
  //           name: 'ems-utilities-site',
  //           meta: {
  //             title: '사업장 영업정보',
  //             icon: 'plug-circle-bolt',
  //             namePath: ['ems', 'utilities', 'site'],
  //             fullPath: '/ems/utilities/site'
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // },
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
      },
      {
        path: 'list',
        name: 'components-list',
        meta: {
          title: 'List',
          namePath: ['components', 'components-list'],
          fullPath: '/components/list'
        }
      },
      {
        path: 'form',
        name: 'components-form',
        meta: {
          title: 'Form',
          namePath: ['components', 'components-form'],
          fullPath: '/components/form'
        }
      },
      {
        path: 'timeline',
        name: 'components-timeline',
        meta: {
          title: 'Timeline',
          namePath: ['components', 'components-timeline'],
          fullPath: '/components/timeline'
        }
      },
      {
        path: 'search-select',
        name: 'components-search-select',
        meta: {
          title: 'SearchSelect',
          namePath: ['components', 'components-search-select'],
          fullPath: '/components/search-select'
        }
      },
      {
        path: 'input',
        name: 'components-input',
        meta: {
          title: 'Input',
          namePath: ['components', 'components-input'],
          fullPath: '/components/input'
        }
      },
      {
        path: 'select',
        name: 'components-select',
        meta: {
          title: 'Select',
          namePath: ['components', 'components-select'],
          fullPath: '/components/select'
        }
      },
      {
        path: 'tour',
        name: 'components-tour',
        meta: {
          title: 'Tour',
          namePath: ['components', 'components-tour'],
          fullPath: '/components/tour'
        }
      },
      {
        path: 'drawer',
        name: 'components-drawer',
        meta: {
          title: 'Drawer',
          namePath: ['components', 'components-drawer'],
          fullPath: '/components/drawer'
        }
      }
    ]
  }
]

export const sampleMenus = [
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
      },
      {
        path: 'list',
        name: 'components-list',
        meta: {
          title: 'List',
          namePath: ['components', 'components-list'],
          fullPath: '/components/list'
        }
      },
      {
        path: 'form',
        name: 'components-form',
        meta: {
          title: 'Form',
          namePath: ['components', 'components-form'],
          fullPath: '/components/form'
        }
      },
      {
        path: 'timeline',
        name: 'components-timeline',
        meta: {
          title: 'Timeline',
          namePath: ['components', 'components-timeline'],
          fullPath: '/components/timeline'
        }
      },
      {
        path: 'search-select',
        name: 'components-search-select',
        meta: {
          title: 'SearchSelect',
          namePath: ['components', 'components-search-select'],
          fullPath: '/components/search-select'
        }
      },
      {
        path: 'input',
        name: 'components-input',
        meta: {
          title: 'Input',
          namePath: ['components', 'components-input'],
          fullPath: '/components/input'
        }
      },
      {
        path: 'select',
        name: 'components-select',
        meta: {
          title: 'Select',
          namePath: ['components', 'components-select'],
          fullPath: '/components/select'
        }
      },
      {
        path: 'tour',
        name: 'components-tour',
        meta: {
          title: 'Tour',
          namePath: ['components', 'components-tour'],
          fullPath: '/components/tour'
        }
      }
    ]
  }
]
