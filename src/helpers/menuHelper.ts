import type { IWorkspace } from '@/services/workspace/types'
import type { IMenu } from '@/stores/modules/workspace/types'

function getMenus(menus: IWorkspace.MenuDto[], menuLink?: string, menuName?: string): IMenu[] {
  return menus.map((menu) => {
    let children: IMenu[] = []
    let fullPath = menu.link
    let name = menu.name
    const icon = menu.depth ? undefined : menu.icon
    const namePath = [menu.name]

    if (menuLink) fullPath = menuLink + fullPath

    if (menuName) {
      namePath.unshift(menuName)
      name = menuName + '-' + name
    }

    if (menu.subMenus.length > 0) {
      children = getMenus(menu.subMenus, menu.link, menu.name)
    }

    return {
      path: menu.link,
      name,
      meta: {
        title: menu.title,
        namePath,
        fullPath,
        icon,
        isNew: menu.isNew
      },
      children
    }
  })
}

export { getMenus }
