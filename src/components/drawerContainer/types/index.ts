export interface DrawerContainerProps {
  /**
   * 드래그로 리사이징 효과 사용 여부
   */
  useResize?: boolean
  /**
   * drawer 위치
   */
  drawerPosition?: 'left' | 'right'
  /**
   * drawer 외의 영역을 덮으면서 나오는지 여부
   */
  isFloating?: boolean
  /**
   * 영역을 덮으면서 리사이징 여부, 'isFloating=false' 일 때만 사용가능
   */
  isFloatResize?: boolean // isFloating=false 일 때만
  /**
   * drawer 뒤에 mask 사용여부, 'isFloating=true' 일 때만 사용가능
   */
  useMask?: boolean // isFloating=true 일 때만
  /**
   * drawer 너비값, '%'를 붙여서 사용 (ex. '30%')
   */
  drawerWidth?: string
  /**
   * drawer 제목
   */
  drawerTitle?: string
  /**
   * drawer 오픈 여부 v-model
   */
  openDetail?: boolean
}
