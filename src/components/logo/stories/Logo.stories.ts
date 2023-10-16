import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { Logo } from '../'

const meta: Meta<ComponentProps<typeof Logo>> = {
  title: 'checkupuikit/Atoms/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    imgPath: 'src/assets/images/checkup_logo_light.png'
  },
  parameters: {
    componentSubtitle: '사내 로고를 나타냅니다.'
  }
}

export default meta
type Story = StoryObj<typeof Logo>

export const Default: Story = {}
