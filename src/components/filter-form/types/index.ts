export const FILTER_UI = {
  SELECT: 'select',
  DATE_PICKER: 'datepicker',
  RANGE_DATE_PICKER: 'rangeDatePicker',
  CHECKBOX: 'checkbox',
  RADIO: 'radio'
} as const

export type FilterUI = (typeof FILTER_UI)[keyof typeof FILTER_UI]

export interface IFilter {
  title: string
  key: string
  type: FilterUI
  options: LabelValue[]
}

export interface FilterFormItem extends IFilter {
  index: number
  open: boolean
  selectedItems: any[]
}

export type FilterList = IFilter[]

export interface FilterFormProps {
  items: FilterFormItem[]
}
