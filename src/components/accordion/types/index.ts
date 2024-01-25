import type { CollapseProps as ACollapseProps } from 'ant-design-vue/es/collapse/Collapse'
import { type CSSProperties } from 'vue'

export type AccordionIconPositionType = 'start' | 'end'

interface AccordionItem {
  title: string
  [key: string]: string
}

export interface AccordionProps {
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

  style?: CSSProperties
}

export interface AccordionPanelProps {
  key?: string | number
  header?: string | number
  text?: string | number
  style?: CSSProperties
}
