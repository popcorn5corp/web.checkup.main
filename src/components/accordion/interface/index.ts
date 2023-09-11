export type AccordionIconPositionType = 'start' | 'end'

interface AccordionItems {
  [key: string]: string
}

export interface AccordionProps {
  items?: AccordionItems[]
  activeKey?: string | number
  expandIconPosition?: AccordionIconPositionType
  bordered?: boolean
  ghost?: boolean
  style?: string
}

export interface AccordionPanelProps {
  key?: string | number
  header?: string | number
  text?: string | number
  style?: string | number
}
