export const menus: any = [
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/welcome',
    component: {
      name: 'LayoutParentView',
      __hmrId: 'f60f4a90',
      __file: '/Users/insukim/Desktop/Develop/vite-vue3-admin/src/layout/routerView/index.vue'
    },
    meta: {
      title: 'routes.dashboard.dashboard',
      icon: 'icon-yibiaopan',
      namePath: ['dashboard'],
      fullPath: '/dashboard'
    },
    children: [
      {
        path: 'welcome',
        name: 'dashboard-welcome',
        meta: {
          title: 'routes.dashboard.workbench',
          icon: 'icon-shouye',
          namePath: ['dashboard', 'dashboard-welcome'],
          fullPath: '/dashboard/welcome'
        }
      }
    ]
  }
]
