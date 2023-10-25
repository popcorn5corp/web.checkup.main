export const FilterTypes = {
  SELECT: 'select',
  DATE_PICKER: 'datepicker',
  RANGE_DATE_PICKER: 'rangeDatePicker',
  CHECKBOX: 'checkbox',
  RADIO: 'radio'
} as const

export type FilterType = (typeof FilterTypes)[keyof typeof FilterTypes]

export interface Filter {
  type: FilterType
  title: string
  open: boolean
  options: LabelValue[]
  selectedItems: any[]
}

export const FilterItem = {}
