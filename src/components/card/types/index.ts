import type { Component } from 'vue'

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
  content?: any
  createdAt?: number
  // content?: ContentData[] | VNode | string
  component?: Component
}

//TODO
export interface CardListProps {
  items: Array<Recordable>
}

// interface ContentData extends CardProps {
//   id: string | number
//   division?: string
//   createdAt: string
//   contents: Content[]
// }

type Content = {
  key: string
  label: string
  value: string
}