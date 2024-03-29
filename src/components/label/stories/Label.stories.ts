import type { Meta, StoryObj } from '@storybook/vue3'
import { Label } from '../'

const meta = {
  title: 'checkupuikit/Atoms/Label',
  component: Label,
  tags: ['autodocs'],

  argTypes: {
    text: {
      description: 'set the title of label',
      type: { name: 'string', required: true }
    },
    size: {
      description: 'set the size of label',
      type: { name: 'string', required: false },
      options: ['small', 'middle', 'large'],
      control: 'select',
      table: {
        type: { summary: 'small | middle | large' },
        defaultValue: { summary: 'middle' }
      }
    },
    theme: {
      description: 'set the theme of label',
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
      description: 'can be set label shape',
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
    componentSubtitle: 'Label을 사용하여 콘텐츠에 대한 분류 및 추가적인 정보를 나타낼 수 있습니다.'
  }
} satisfies Meta<typeof Label>

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
