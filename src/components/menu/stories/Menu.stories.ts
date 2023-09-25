import type { Meta, StoryObj } from '@storybook/vue3'
import { Layout } from 'ant-design-vue'
import { computed, toRefs } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { Menu } from '../'
import { menus } from '../src/mock'

const meta: Meta<ComponentProps<typeof Menu>> = {
  title: 'checkupuikit/Atoms/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: '메뉴 리스트 정보',
      table: {
        type: {
          summary: 'MenuList',
          detail: `Array<{ path: string name: string meta: { title: string icon: string namePath: string[] fullPath: string isNew: boolean } children?: MenuItem[] }>`
        }
      }
    },
    mode: {
      description: '메뉴 모드',
      control: 'select',
      options: ['horizontal', 'vertical', 'inline'],
      table: {
        type: {
          summary: 'MenuMode',
          detail: `'horizontal' | 'vertical' | 'inline'`
        }
      }
    }
  },
  parameters: {
    componentSubtitle: `Menu 컴포넌트를 사용하여 다양한 메뉴의 탐색을 할 수 있습니다.`
  },
  args: {
    items: menus,
    mode: 'inline',
    collapsed: false,
    isSide: true
  }
}

export default meta
type Story = StoryObj<typeof Menu>

const { Sider } = Layout
export const Default: Story = {
  render: (args) => ({
    components: { Menu, Sider },
    setup() {
      const { collapsed, mode, isSide } = toRefs(args)
      const asiderWidth = computed(() => (collapsed.value ? 80 : 220))
      const menuMode = computed(() => (isSide?.value ? 'inline' : mode?.value))

      return { ...args, isSide, collapsed, mode, asiderWidth, menuMode }
    },
    template: `
      <Sider
        v-if="isSide"
        class="layout-sider"
        v-model:collapsed="collapsed"
        :width="asiderWidth"
        :trigger="null"
        collapsible
      >    
        <Menu :items="items" :collapsed="collapsed" :mode="menuMode" :isSide="isSide" />
      </Sider>

      <Menu v-else :items="items" :collapsed="collapsed" :mode="menuMode" :isSide="isSide" />
    `
  })
}
