import type { Meta, StoryObj } from '@storybook/vue3'

import Button from './Button.vue'

const meta = {
  title: 'checkupuikit/Atoms/Button',
  component: Button,
  tags: ['autodocs'],

  argTypes: {
    label: {
      description: 'set the inner text of button',
      type: { name: 'string', required: false },
      defaultValue: 'button',
      control: {
        type: 'text'
      }
    },

    type: {
      description: 'can be set button type',
      type: { name: 'string', required: false },
      options: ['default', 'primary', 'dashed', 'text', 'link'],
      control: 'select',
      table: {
        type: { summary: 'primary | ghost | dashed | link | text | default' },
        defaultValue: { summary: 'default' }
      }
    },

    icon: {
      description: 'set the icon of button',
      type: { name: 'string', required: false },
      options: ['download', 'plusCircle', 'excel'],
      control: 'select',
      table: {
        type: { summary: 'download | plus | excel' }
      }
    },

    size: {
      description: 'set the size of button',
      type: { name: 'string', required: false },
      options: ['small', 'medium', 'large'],
      control: 'select',
      table: {
        type: { summary: 'large | middle | small' },
        defaultValue: { summary: 'middle' }
      }
    },

    shape: {
      description: 'can be set button shape',
      type: { name: 'string', required: false },
      options: ['default', 'round', 'circle'],
      control: 'select',
      table: {
        type: { summary: 'default | circle | round' },
        defaultValue: { summary: 'default' }
      }
    },

    loading: {
      description: 'set the loading status of button',
      type: { name: 'boolean', required: false },
      table: {
        type: { summary: 'boolean | { delay: number }' },
        defaultValue: { summary: false }
      }
    },

    disabled: {
      description: 'disabled state of button',
      type: { name: 'boolean', required: false },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    }
  },
  args: { loading: false, disabled: false } // default value
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
