import type { Meta, StoryObj } from '@storybook/vue3'
import { Button, Layout } from 'ant-design-vue'
import { computed, toRefs } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@/components/icons'
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
    },
    theme: {
      control: 'select',
      options: ['dark', 'light']
    }
  },
  parameters: {
    componentSubtitle: `Menu 컴포넌트를 사용하여 다양한 메뉴의 탐색을 할 수 있습니다.`
  },
  args: {
    items: menus,
    mode: 'inline',
    collapsed: false,
    isSide: true,
    theme: 'light'
  }
}

export default meta
type Story = StoryObj<typeof Menu>

export const Default: Story = {
  render: (args) => ({
    components: { Menu, Sider: Layout.Sider, Button, MenuUnfoldOutlined, MenuFoldOutlined },
    setup() {
      const { collapsed, mode, isSide, theme } = toRefs(args)
      const asiderWidth = computed(() => (collapsed.value ? 80 : 220))
      const menuMode = computed(() => (isSide?.value ? 'inline' : mode?.value))

      const toggleCollapsed = () => {
        collapsed.value = !collapsed.value
      }

      return {
        ...args,
        isSide,
        theme,
        mode,
        asiderWidth,
        menuMode,
        collapsed,
        toggleCollapsed
      }
    },
    template: `
      <div>
      <Button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </Button>
      </div>
 

      <Sider
        v-if="isSide"
        class="layout-sider"
        v-model:collapsed="collapsed"
  
        :width="asiderWidth"
        :trigger="null"
        collapsible
      >    
        <Menu :items="items" :theme="theme" :collapsed="collapsed" :mode="menuMode" :isSide="isSide" />
      </Sider>

      <Menu v-else :items="items" :theme="theme" :collapsed="collapsed" :mode="menuMode" :isSide="isSide" />
    `
  })
}
