import type { CSSProperties } from 'vue'

type ButtonSize = 'small' | 'medium' | 'large'
type ButtonType = 'primary' | 'dashed' | 'text' | 'link'
type ButtonShape = 'default' | 'circle' | 'round'
export type ButtonIcon = 'download' | 'plusCircle' | 'excel'

export interface ButtonProps {
  label?: string
  size?: ButtonSize
  type?: ButtonType
  shape?: ButtonShape
  icon?: ButtonIcon
  loading?: boolean
  disabled?: boolean
  style?: CSSProperties
}

export interface ButtonEmits {
  (e: 'click'): void
}
