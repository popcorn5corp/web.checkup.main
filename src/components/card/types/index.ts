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
  rowKey: string | number
  id?: string | number
  title?: string
  content: Recordable
  detailBtnPosition?: DetailPositionType
  useCheckbox?: boolean
  imgPreview?: boolean
  tag?: string
  imgUrl?: string
  item: Recordable
  createdAt?: number
  date?: string
  component?: Component
}

export interface CardListProps {
  rowKey: string | number
  items?: Array<Recordable>
  useCheckbox?: boolean
  imgPreview?: boolean
  detailBtnPosition?: DetailPositionType
  size?: CardSize
}
