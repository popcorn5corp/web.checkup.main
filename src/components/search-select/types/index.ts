import type { SelectProps } from 'ant-design-vue'
import type { DefaultOptionType } from 'ant-design-vue/es/select'

interface SelectOptions {
  /**
   * 고정으로 앞에 붙는 이미지
   */
  prefixImg?: string
  /**
   * 설명
   */
  description?: string
  /**
   * 비활성화
   */
  disabled?: string
}
export interface SearchSelectProps extends SelectProps {
  /**
   * 옵션 데이터
   */
  options: DefaultOptionType[] & SelectOptions[]
  /**
   * pagination 정보
   */
  pagination?: Recordable
  /**
   * 넓이 조정
   */
  width?: string
  /**
   * 입력시 설명문
   */
  placeholder?: string
}
