export const whiteNameList = ['Login', 'icons', 'error', 'error-404'] as const // no redirect whitelist

export type WhiteNameList = typeof whiteNameList
export type WhiteName = (typeof whiteNameList)[number]
