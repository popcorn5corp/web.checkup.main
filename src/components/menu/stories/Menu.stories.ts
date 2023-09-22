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
    docs: {
      description: {
        component: `**FileManager Service** 기반으로 동작하기에 내부 원격 서버로의 업로드에 최적화되어 있습니다. `
      }
    },
    componentSubtitle:
      'File Uploader 컴포넌트를 사용하여 원격 서버에 이미지, 문서 등의 정보를 업로드할 수 있습니다.'
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
