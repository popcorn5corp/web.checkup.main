import type { Component, VNode } from 'vue'

export enum GoDetailType {
  MIDDLE = 'MIDDLE',
  BOTTOM = 'BOTTOM'
}
/**
 * mouseOverEvent
 * useCheckbox , goDetailType
 * imgPreview
 */
export interface CardProps {
  key: string | number
  title?: string
  goDetailText?: string
  goDetailType?: GoDetailType
  useCheckbox?: boolean
  imgPreview?: boolean
  tag?: string
  imgUrl?: string
  content?: ContentData[] | VNode | string
  component?: Component
}

interface ContentData extends CardProps {
  id: string | number
  division?: string
  createdAt: string
  contents: Content[]
}

type Content = {
  key: string
  label: string
  value: string
}
