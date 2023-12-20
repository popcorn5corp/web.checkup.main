import type { SelectProps } from 'ant-design-vue'
import type { DefaultOptionType } from 'ant-design-vue/es/select'

interface SelectOptions {
  prefixImg?: string
  description?: string
  disabled?: string
}
export interface SearchSelectProps extends SelectProps {
  options: DefaultOptionType[] & SelectOptions[]
  pagination?: Recordable
  width?: string
}
