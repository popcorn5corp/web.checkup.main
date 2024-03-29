import type {
  FormItemProps as AFormItemProps,
  FormProps as AFormProps
} from 'ant-design-vue/lib/form'

export type FormLabelAlign = 'left' | 'right'
export type FormLayout = 'horizontal' | 'vertical' | 'inline'

export interface FormRules {
  required?: boolean
  message?: string
  type?: string
  min?: number
  len?: number
  pattern?: RegExp
}

export interface FormProps extends AFormProps {
  /**
   * 폼 내부 데이터
   */
  model?: Recordable
  /**
   *
   */
  rulesRef?: Recordable<FormRules>
  /**
   *  비활성화
   */
  disabled?: boolean
  /**
   *  모든 항목의 필수 여부 숨김
   */
  hideRequiredMark?: boolean
  /**
   *  라벨 텍스트 정렬
   */
  labelAlign?: FormLabelAlign
  /**
   *  폼 레이아웃 정렬
   */
  layout?: FormLayout
}

export interface FormItemProps extends AFormItemProps {
  /**
   * FormItem Label
   */
  label?: string
  /**
   * FormItem 내부 필드에 대한 border, valid text 를 feed-back color 로 적용해주기 위한 option
   */
  isError?: boolean
}

export interface FormItemRestProps {}

export interface FormAction {}
