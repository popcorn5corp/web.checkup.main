import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { DynamicTable } from '../'

const meta: Meta<ComponentProps<typeof DynamicTable>> = {
  title: 'checkupuikit/Atoms/DynamicTable',
  component: DynamicTable,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof DynamicTable>

export const Default: Story = {
  args: {}
}
