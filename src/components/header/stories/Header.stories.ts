import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { Header } from '../'

const meta: Meta<ComponentProps<typeof Header>> = {
  title: 'checkupuikit/Organism/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    collapsed: {
      description: '메뉴 Collapse 버튼'
    },
    theme: {
      table: {
        type: {
          summary: 'MenuTheme',
          detail: 'light | dark'
        }
      }
    }
  },
  args: {},
  parameters: {
    componentSubtitle: '페이지 레이아웃의 Header 입니다.'
  }
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: {
    collapsed: false
  }
}
