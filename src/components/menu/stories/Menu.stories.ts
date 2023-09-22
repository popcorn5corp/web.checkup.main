import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { Menu } from '../'
import { menus } from '../src/mock'

const meta: Meta<ComponentProps<typeof Menu>> = {
  title: 'checkupuikit/Atoms/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    // docs: {
    //   description: {
    //     component: `Menu 컴포넌트를 사용하여 다양한 메뉴의 탐색을 할 수 있습니다.`
    //   }
    // }
    componentSubtitle: `Menu 컴포넌트를 사용하여 다양한 메뉴의 탐색을 할 수 있습니다.`
  },
  args: {
    items: menus
  }
}

export default meta
type Story = StoryObj<typeof Menu>

export const Default: Story = {
  args: {}
}
