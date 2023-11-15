import { type CSSProperties } from 'vue'

export type AccordionIconPositionType = 'start' | 'end'

interface AccordionItem {
  title: string
  [key: string]: string
}

export interface AccordionProps {
  items?: Recordable[]
  activeKey?: [] | string | number
  expandIconPosition?: AccordionIconPositionType
  bordered?: boolean
  ghost?: boolean
  style?: CSSProperties
}

export interface AccordionPanelProps {
  key?: string | number
  header?: string | number
  text?: string | number
  style?: CSSProperties
}
