import type { TourProps as ATourProps, TourStepProps as ATourStepProps } from 'ant-design-vue'
import type { PlacementType } from 'ant-design-vue/lib/vc-tour/placements'
import type { VNode } from 'vue'

export interface TourProps extends ATourProps {
  /**
   * 투어 시작 여부
   */
  open: boolean
  /**
   * 투어 데이터
   */
  steps: TourSteps[]
}

export interface TourSteps extends ATourStepProps {
  /**
   * 투어 타이틀
   */
  title?: string
  /**
   * 투어 설명
   */
  description?: string
  /**
   * 표시된 사진이나 비디오
   */
  cover?: VNode
  /**
   * 대상 요소를 기준으로 한 카드의 위치
   */
  placement?: PlacementType
  /**
   * 요소의 중심을 가르킬지 여부를 포함하여 화살표 표시 여부
   */
  arrow?: boolean | { pointAtCenter: boolean }
  /**
   * 이동할 페이지 위치
   */
  goPage?: Path
}

export interface TourEmits {
  /**
   * 스텝 변경시 Callback 함수
   * @param currentIndex
   */
  (event: 'change', currentIndex: number): void

  /**
   * 스텝 종료시 props open값 업데이트 함수
   * @param open
   */
  (event: 'update:open', open: boolean): void
}

export interface TourStpesState {
  tours: {
    [key: string]: TourSteps[]
  }
}

export const path = {
  DYNAMIC_TABLE: '/samples/dynamic-table'
} as const

export type Path = (typeof path)[keyof typeof path]

export const TOUR_TYPE = {
  OVERVIEW_PAGE_TOUR: 'OVERVIEW_PAGE_TOUR',
  CHECKUP_TOUR: 'CHECKUP_TOUR',
  CHECKUP_TOUR_DEMO: 'CHECKUP_TOUR_DEMO'
} as const

export type TourType = (typeof TOUR_TYPE)[keyof typeof TOUR_TYPE]
