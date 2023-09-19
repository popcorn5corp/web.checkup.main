import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { Modal } from '../src'

const meta: Meta<ComponentProps<typeof Modal>> = {
  title: 'checkupuikit/Atoms/Modal',
  component: Modal,
  tags: ['autodocs'],

  parameters: {
    layout: 'fullscreen',

    componentSubtitle: '모달',
    description: {
      component: `모달 description`
    }
  },

  // Set Args Table Description
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {}
