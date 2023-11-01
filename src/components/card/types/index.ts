import type { Component } from 'vue'
import type { CardSize } from '@/components/table/types'

export const detailPositionTypes = {
  middle: 'middle',
  bottom: 'bottom'
} as const

export type DetailPositionType = (typeof detailPositionTypes)[keyof typeof detailPositionTypes]

/**
 * mouseOverEvent
 * useCheckbox , detailBtnPosition
 * imgPreview
 */
export interface CardProps {
  id?: string | number
  title?: string
  detailBtnPosition?: DetailPositionType
  useCheckbox?: boolean
  imgPreview?: boolean
  tag?: string
  imgUrl?: string
  item?: any
  createdAt?: number
  component?: Component
}

export interface CardListProps {
  items?: Array<Recordable>
  useCheckbox?: boolean
  imgPreview?: boolean
  detailBtnPosition?: DetailPositionType
  size?: CardSize
  // TODO
  imgUrl?: string
}
