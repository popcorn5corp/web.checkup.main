import type { Component, VNode } from 'vue'

export interface CardProps {
  key: string
  size: 'default' | 'small'
  title?: string
  extraText?: string
  extraUrl?: string
  imgUrl?: string
  content?: string | VNode
  component?: Component
  gridWidth?: string
}

export type CardList = CardProps[]
