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
  model?: Recordable
  rulesRef?: Recordable<FormRules>
  colon?: boolean
  disabled?: boolean
  hideRequiredMark?: boolean
  labelAlign?: FormLabelAlign
  layout?: FormLayout
}

export interface FormItemProps extends AFormItemProps {
  label?: string
}

export interface FormItemRestProps {}

export interface FormAction {}
