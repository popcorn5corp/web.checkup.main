import type {
  TimelineItemProps as ATimelineItemProps,
  TimelineProps as ATimelineProps
} from 'ant-design-vue'

export interface TimelineProps extends ATimelineProps {
  /**
   * 타임라인 데이터
   */
  items?: Item[]
  /**
   *  로딩스피너
   */
  loading?: boolean
  /**
   * 하단 버튼 여부
   */
  showBtn?: boolean
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
  targetUid?: string
  targetNickName?: string
  status: LabelValue<string>
}

export interface TimelineItemProps extends ATimelineItemProps {}
