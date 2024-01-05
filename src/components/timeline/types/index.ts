import type { TimelineProps as ATimelineProps } from 'ant-design-vue'

export interface Item {
  [key: string]: any
}

export interface TimelineProps extends ATimelineProps {
  items: Item[]
  loading?: boolean
  pagination?: boolean
}

export interface TimelineItemProps {
  item: Item
}
