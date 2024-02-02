import type { Meta, StoryObj } from '@storybook/vue3'
import { Button } from '../'

const meta = {
  title: 'checkupuikit/Atoms/Button',
  component: Button,
  tags: ['autodocs'],

  argTypes: {
    default: {
      table: { type: '' },
      control: Object
    },
    click: {
      table: { type: '' },
      control: Object
    },
    style: {
      table: { type: '' },
      control: Object
    },

    label: {
      type: { name: 'string', required: false },
      defaultValue: 'button',
      control: {
        type: 'text'
      }
    },
    type: {
      type: { name: 'string', required: false },
      options: ['default', 'primary', 'dashed', 'text', 'link'],
      control: 'select',
      table: {
        type: { summary: 'primary | ghost | dashed | link | text | default' },
        defaultValue: { summary: 'default' }
      }
    },
    icon: {
      description: '아이콘 추가',
      type: { name: 'string', required: false },
      options: ['download', 'plusCircle', 'excel'],
      control: 'select',
      table: {
        type: { summary: 'download | plus | excel' }
      }
    },
    size: {
      type: { name: 'string', required: false },
      options: ['small', 'middle', 'large'],
      control: 'select',
      table: {
        type: { summary: 'large | middle | small' },
        defaultValue: { summary: 'middle' }
      }
    },
    shape: {
      type: { name: 'string', required: false },
      options: ['default', 'round', 'circle'],
      control: 'select',
      table: {
        type: { summary: 'default | circle | round' },
        defaultValue: { summary: 'default' }
      }
    },
    loading: {
      type: { name: 'boolean', required: false },
      table: {
        type: { summary: 'boolean | { delay: number }' },
        defaultValue: { summary: false }
      }
    },
    disabled: {
      type: { name: 'boolean', required: false },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    }
  },
  args: { loading: false, disabled: false, size: 'middle', shape: 'default' }, // default value
  parameters: {
    componentSubtitle:
      'Button 컴포넌트의 클릭이벤트를 활용하여 다양한 비즈니스 로직을 수행할 수 있습니다.'
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'Button',
    type: 'primary'
  }
}

export const Secondary: Story = {
  args: {
    label: 'Button'
  }
}

export const LoadingSpinnerWithText: Story = {
  args: {
    label: 'Loading!',
    type: 'primary',
    loading: true
  }
}

export const LoadingSpinner: Story = {
  args: {
    shape: 'circle',
    loading: true
  }
}

export const Download: Story = {
  args: {
    label: 'Download',
    icon: 'download'
  }
}
