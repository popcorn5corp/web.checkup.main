import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { Button } from '@/components/button'
import { Drawer } from '../'

const meta: Meta<ComponentProps<typeof Drawer>> = {
  title: 'checkupuikit/Atoms/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    drawerPosition: {
      description: 'drawer 위치',
      type: { name: 'string' },
      options: ['left', 'right'],
      control: 'select',
      table: {
        type: {
          summary: 'left | right'
        },
        defaultValue: { summary: 'right' }
      }
    },
    mask: {
      description: `drawer 뒤에 mask 사용여부, 'floating=true' 일 때만 사용가능`,
      table: {
        type: { summary: 'boolean' }
      }
    },
    drawerWidth: {
      description: 'drawer 너비값',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '30%' }
      }
    },
    drawerTitle: {
      description: 'drawer 제목',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    },
    openDetail: {
      description: 'drawer 오픈 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    minHeight: {
      description: 'drawer 최소 높이',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    },
    top: {
      description: 'drawer 위치 top 값',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    }
  },
  args: {
    drawerPosition: 'right',
    mask: false,
    drawerWidth: '30%',
    drawerTitle: 'drawer 제목'
  },
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Drawer는 측면에서 나오는 컴포넌트 입니다. 일련의 정보 등이 담겨있습니다. 사용자는 현재 페이지를 떠나지 않고도 Drawer와 상호 작용할 수 있으므로 동일한 컨텍스트 내에서 작업을 보다 효율적으로 수행할 수 있습니다.'
  }
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  args: {
    ...meta.args
  },
  render: (args: any) => ({
    components: { Drawer, Button },
    setup() {
      const openDetail = ref(false)

      return { openDetail, args }
    },
    template: `
      <div style="width: 100%; height: 500px;">
        <Button label="drawer 열기" @click="openDetail = true"/>
        <Drawer
          v-model:openDetail="openDetail"
          v-bind="args"
          @onClose="openDetail = false"
        >
          <template #drawerContent>
            <div style="padding: 1rem; display: flex; justify-content: center; align-items: center; background: #c7e5fe;">drawer 영역</div>
          </template>
        </Drawer>
      </div>
    `
  })
}

export const PositionLeft: Story = {
  args: { ...Default.args, drawerPosition: 'left' },
  render: Default.render
}

export const UseMask: Story = {
  args: { ...Default.args, mask: true },
  render: Default.render
}
