import type {
  CollapsePanelProps as ACollapsePanelProps,
  CollapseProps as ACollapseProps
} from 'ant-design-vue'
import { type CSSProperties } from 'vue'

export type AccordionIconPositionType = 'start' | 'end'

export interface CollapseProps extends /* @vue-ignore */ ACollapseProps {
  /**
   * 아코디언 패널 생성 데이터
   */
  items?: Recordable[]
  /**
   * 활성 패널의 key
   */
  activeKey?: string[] | string | number[] | number
  /**
   * 확장 아이콘 위치 설정
   */
  expandIconPosition?: AccordionIconPositionType
  /**
   * 테두리 유무
   */
  bordered?: boolean
  /**
   * 경계선 제거 및 투명 배경 제공
   */
  ghost?: boolean
  /**
   * 패널 아이콘(화살표) 유무
   */
  showArrow?: boolean

  style?: CSSProperties
}

export interface CollapsePanelProps extends /* @vue-ignore */ ACollapsePanelProps {
  /**
   * 패널 타이틀
   */
  key?: string | number
  /**
   * 패널 타이틀
   */
  header?: string | number | Element
  /**
   * 패널들을 식별하는 고유 키
   */
  text?: string | number

  style?: CSSProperties
}
