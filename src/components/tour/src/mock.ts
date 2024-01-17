import { createVNode } from 'vue'
import type { TourProps } from '../types'

export const steps: TourProps[] = [
  {
    title: 'Upload File',
    description: 'Put your files here.',
    cover: createVNode('img', {
      alt: 'tour.png',
      src: 'https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png'
    }),
    target: null
  },
  {
    title: 'Save',
    description: 'Save your changes.',
    target: null
  },
  {
    title: 'Other Actions',
    description: 'Click to see other actions.',
    target: null
  }
]
