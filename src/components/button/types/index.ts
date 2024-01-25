import type { CSSProperties } from 'vue'

type ButtonSize = 'small' | 'middle' | 'large'
type ButtonType = 'primary' | 'dashed' | 'text' | 'link'
type ButtonShape = 'default' | 'circle' | 'round'
export type ButtonIcon = 'download' | 'plusCircle' | 'excel' | 'filter'

export interface ButtonProps {
  /**
   *  버튼 내부 텍스트
   */
  label?: string
  /**
   *  버튼 사이즈
   */
  size?: ButtonSize
  /**
   *  버튼 모양
   */
  shape?: ButtonShape
  /**
   *  버튼 타입
   */
  type?: ButtonType
  /**
   *  아이콘 추가
   */
  icon?: ButtonIcon
  /**
   *  버튼 로딩스피너
   */
  loading?: boolean
  /**
   *  버튼 비활성화
   */
  disabled?: boolean

  style?: CSSProperties
}

export interface ButtonEmits {
  /**
   * 버튼 클릭시 Callback 함수
   * @param e
   */
  (event: 'click', e: Event): void
}
