export enum DeviceEnum {
  Mobile,
  Desktop
}

export enum LayoutModeEnum {
  Left = "left",
  Top = "top",
  LeftTop = "left-top"
}

export const SIDEBAR_OPENED = "opened"
export const SIDEBAR_CLOSED = "closed"

export type SidebarOpened = typeof SIDEBAR_OPENED
export type SidebarClosed = typeof SIDEBAR_CLOSED
