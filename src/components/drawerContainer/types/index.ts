export interface DrawerContainerProps {
  useResize?: boolean
  drawerPosition?: 'left' | 'right'
  isFloating?: boolean
  isFloatResize?: boolean // isFloating=false 일 때만
  useMask?: boolean // isFloating=true 일 때만
  drawerWidth?: string
  drawerTitle?: string
  openDetail?: boolean
}
