import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { Button } from '@/components/button'
import { DrawerContainer } from '../'

const meta: Meta<ComponentProps<typeof DrawerContainer>> = {
  title: 'checkupuikit/Template/DrawerContainer',
  tags: ['autodocs'],
  argTypes: {
    useResize: {
      description: '드래그로 리사이징 기능 사용여부',
      type: { name: 'boolean' },
      table: {
        type: { summary: 'boolean' }
      }
    },
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
    isFloating: {
      description: 'drawer 외의 영역을 덮으면서 나오는지 여부',
      table: {
        type: { summary: 'boolean' }
      }
    },
    isFloatResize: {
      description: `영역을 덮으면서 리사이징 여부, 'isFloating=false' 일 때만 사용가능`,
      table: {
        type: { summary: 'boolean' }
      }
    },
    useMask: {
      description: `drawer 뒤에 mask 사용여부, 'isFloating=true' 일 때만 사용가능`,
      table: {
        type: { summary: 'boolean' }
      }
    },
    drawerWidth: {
      description: `drawer 너비값, '%'를 붙여서 사용`,
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
    }
  },
  args: {
    drawerPosition: 'right',
    isFloatResize: false,
    useMask: false
  },
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '드래그로 리사이징이 가능한 drawer를 감싸는 컨테이너'
  }
}

export default meta
type Story = StoryObj<typeof DrawerContainer>

export const Default: Story = {
  args: {
    ...meta.args
  },
  render: (args: any) => ({
    components: { DrawerContainer, Button },
    setup() {
      const openDetail = ref(false)

      return { openDetail, args }
    },
    template: `
      <DrawerContainer
        v-model:openDetail="openDetail"
        style="overflow: hidden"
        v-bind="args"
      >
        <template #content>
          <div style="height: 950px; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #c7e5fe; padding: 1rem 0;">
            <div>content 영역</div>
            <br />
            <Button label="drawer 열기" @click="openDetail = true"/>
          </div>
        </template>

        <template #drawerContent>
          <div style="padding: 1rem; height: 840px; display: flex; justify-content: center; align-items: center;">drawer 영역</div>
        </template>
      </DrawerContainer>
    `
  })
}

export const NoResizing: Story = {
  args: { ...Default.args, useResize: false },
  render: Default.render
}
export const LeftPositionDrawer: Story = {
  args: { ...Default.args, drawerPosition: 'left' },
  render: Default.render
}

export const NoFloatingAndFloatDrawer: Story = {
  args: { ...Default.args, isFloating: false, isFloatResize: true },
  render: Default.render
}
export const NoFloatingAndNoFloatDrawer: Story = {
  args: { ...Default.args, isFloating: false, isFloatResize: false },
  render: Default.render
}

export const FloatingAndNoMaskDrawer: Story = {
  args: { ...Default.args, isFloating: true, useMask: false },
  render: Default.render
}
export const FloatingAndMaskDrawer: Story = {
  args: { ...Default.args, isFloating: true, useMask: true },
  render: Default.render
}
