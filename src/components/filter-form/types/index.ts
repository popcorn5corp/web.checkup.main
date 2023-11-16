export const FILTER_UI = {
  SELECT: 'Select',
  DATE_PICKER: 'DatePicker',
  RANGE_DATE_PICKER: 'RangeDatePicker',
  CHECKBOX: 'Checkbox',
  RADIO: 'Radio'
} as const

export type FilterUI = (typeof FILTER_UI)[keyof typeof FILTER_UI]
export type FilterItem = { label: string; value: string | number | boolean }
export type FilterOption = { label: string; value: string | number | boolean }
export interface IFilter {
  title: string
  key: [string] | [string, string]
  order: number
  type: FilterUI
  options?: FilterOption[] // select, checkbox, radio 타입일 경우에 대한 option 목록
  selectedItems?: FilterItem[] // default 값이 있을 경우 추가
}

export interface FilterFormItem extends IFilter {
  index: number
  open: boolean
  options: FilterOption[]
  selectedItems: FilterItem[]
}

export type FilterList = IFilter[]

export interface FilterFormProps {
  items: FilterFormItem[]
}
