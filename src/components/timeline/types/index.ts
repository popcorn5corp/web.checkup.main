import type {
  TimelineItemProps as ATimelineItemProps,
  TimelineProps as ATimelineProps
} from 'ant-design-vue'

export interface TimelineProps extends ATimelineProps {
  items?: Item[]
  loading?: boolean
  pagination?: boolean
}

export interface Item {
  issuedDate: string
  logs: Log[]
}

export interface Log {
  logId: string
  uid: string
  createTime: string
  nickname: string
  status: LabelValue<string>
}

export interface TimelineItemProps extends ATimelineItemProps {}
