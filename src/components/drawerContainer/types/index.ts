import type { DrawerProps } from '@/components/drawer/types'

export interface DrawerContainerProps extends DrawerProps {
  /**
   * 드래그로 리사이징 효과 사용 여부
   */
  resize?: boolean
  /**
   * drawer 외의 영역을 덮으면서 나오는지 여부
   */
  floating?: boolean
  /**
   * 리사이징 옵션: 영역을 덮으면서/밀면서 리사이징 여부, 'floating=false' 일 때만 사용가능
   */
  resizeOption?: 'float' | 'push' // floating=false 일 때만
}
