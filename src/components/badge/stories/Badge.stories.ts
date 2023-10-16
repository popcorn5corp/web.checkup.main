import type { Meta, StoryObj } from '@storybook/vue3'
import { Badge } from '../'

const meta = {
  title: 'checkupuikit/Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],

  argTypes: {
    text: {
      description: 'set the title of badge',
      type: { name: 'string', required: true }
    },
    size: {
      description: 'set the size of badge',
      type: { name: 'string', required: false },
      options: ['small', 'middle', 'large'],
      control: 'select',
      table: {
        type: { summary: 'small | middle | large' },
        defaultValue: { summary: 'middle' }
      }
    },
    theme: {
      description: 'set the theme of badge',
      type: { name: 'string', required: false },
      options: [
        'primary',
        'primary-outline',
        'orange',
        'orange-outline',
        'red',
        'red-outline',
        'success',
        'success-outline'
      ],
      control: 'select',
      table: {
        type: {
          summary:
            'primary | primary-outline | orange | orange-outline | red | red-outline | default | default-outline | success | success-outline'
        },
        defaultValue: { summary: 'primary' }
      }
    },
    shape: {
      description: 'can be set badge shape',
      type: { name: 'string', required: false },
      options: ['squared', 'round', 'pill'],
      control: 'select',
      table: {
        type: {
          summary: 'squared | round | pill'
        },
        defaultValue: { summary: 'squared' }
      }
    }
  },
  args: { shape: 'squared', size: 'middle' }, // default value
  parameters: {
    componentSubtitle:
      'Badge를 사용하여 요소(링크)와 연결된 항목 수량을 집계하거나 숫자 값에 대한 빠른 시각적 인식을 도울 수 있습니다.'
  }
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    text: 'Grapic Design',
    theme: 'primary'
  }
}

export const PrimaryOutline: Story = {
  args: {
    text: 'Grapic Design',
    theme: 'primary-outline'
  }
}

export const Default: Story = {
  args: {
    text: 'Grapic Design',
    theme: 'default'
  }
}

export const DefaultOutline: Story = {
  args: {
    text: 'Grapic Design',
    theme: 'default-outline'
  }
}

export const Orange: Story = {
  args: {
    text: 'Grapic Design',
    theme: 'orange'
  }
}

export const OrangeOutline: Story = {
  args: {
    text: 'Grapic Design',
    theme: 'orange-outline'
  }
}

export const Square: Story = {
  args: {
    text: 'Grapic Design',
    theme: 'default',
    shape: 'squared'
  }
}

export const Round: Story = {
  args: {
    text: 'Grapic Design',
    theme: 'default',
    shape: 'round'
  }
}

export const Pill: Story = {
  args: {
    text: 'Grapic Design',
    theme: 'default',
    shape: 'pill'
  }
}
