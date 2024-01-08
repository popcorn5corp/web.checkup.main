import Timeline from './Timeline.vue'
import TimelineItem from './TimelineItem.vue'

export { useTimeline } from '../hooks/useTimeline'
export type { TimelineProps } from '../types'

Timeline.Item = TimelineItem

export { Timeline, TimelineItem }
