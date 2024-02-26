export interface DrawerProps {
  /**
   * drawer 위치
   */
  drawerPosition?: 'left' | 'right'
  /**
   * drawer 뒤에 mask 사용여부, 'floating=true' 일 때만 사용가능
   */
  mask?: boolean // floating=true 일 때만
  /**
   * drawer 너비값
   */
  drawerWidth?: string
  /**
   * drawer 제목
   */
  drawerTitle: string
  /**
   * drawer 오픈 여부 v-model
   */
  openDetail: boolean
  /**
   * conatiner의 min-height
   */
  minHeight?: string
  /**
   * drawer의 position top 값
   */
  top?: string
  /**
   * drawer close 함수
   */
  onClose?: () => void
}
