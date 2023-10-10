import type { CSSProperties } from 'vue'

type ButtonSize = 'small' | 'middle' | 'large'
type ButtonType = 'primary' | 'dashed' | 'text' | 'link'
type ButtonShape = 'default' | 'circle' | 'round'
export type ButtonIcon = 'download' | 'plusCircle' | 'excel' | 'filter'

export interface ButtonProps {
  label: string
  size: ButtonSize
  shape: ButtonShape
  type?: ButtonType
  icon?: ButtonIcon
  loading?: boolean
  disabled?: boolean
  style?: CSSProperties
}

export interface ButtonEmits {
  (event: 'click'): void
}
