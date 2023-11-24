export const LOGIN_NAME = 'Login'

export const REDIRECT_NAME = 'Redirect'

export const PARENT_LAYOUT_NAME = 'ParentLayout'

export const PAGE_NOT_FOUND_NAME = 'PageNotFound'

export const whiteNameList = ['Login', 'icons', 'error', 'error-404'] as const // no redirect whitelist

export type WhiteNameList = typeof whiteNameList
export type WhiteName = (typeof whiteNameList)[number]

export const blackTabNameList = ['login', 'login2'] as const
export type BlackTabNameList = typeof blackTabNameList
export type BlackTabName = (typeof blackTabNameList)[number]
