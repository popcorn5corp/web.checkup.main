import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { Card } from '../src'

const meta: Meta<ComponentProps<typeof Card>> = {
  // type card
  title: 'checkupuikit/Atoms/Card',
  component: Card,
  tags: ['autodocs']
}
export default meta
type Story = StoryObj

export const Default: Story = {
  args: {}
}
