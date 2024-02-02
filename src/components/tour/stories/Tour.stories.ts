import type { Meta, StoryObj } from '@storybook/vue3'
import { Avatar, Divider, DropdownButton, Menu, MenuItem, Skeleton, Space } from 'ant-design-vue'
import { computed } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { useTourStore } from '@/stores/modules/tour'
import { Button } from '@/components/button'
import { UserOutlined } from '@/components/icons'
import { List, ListItem, ListItemMeta } from '@/components/list'
import { Tour } from '@/components/tour'
import { useTour } from '@/components/tour/hooks/useTour'
import { TOUR_TYPE } from '@/components/tour/types'

const meta: Meta<ComponentProps<typeof Tour>> = {
  title: 'checkupuikit/Atoms/Tour',
  component: Tour,
  tags: ['autodocs'],

  parameters: {
    layout: 'fullscreen',

    componentSubtitle: '사용자에게 제품을 소개하고 싶을 때 사용합니다.',
    docs: {
      description: {
        component: `스텝 이동시 이벤트 및 액션을 줄 수 있으며, 화면 이동도 가능합니다. `
      }
    }
  },
  argTypes: {
    open: {
      control: 'boolean'
    },
    steps: {
      control: Object
    },
    change: {
      control: Object
    },
    ['update:open']: {
      control: Object
    }
  },
  args: {
    open: false
  }
}

export default meta
type Story = StoryObj<typeof Tour>

export const Default: Story = {
  render: (args) => ({
    setup() {
      const tourStore = useTourStore()
      const tour = useTour()
      const tourType = TOUR_TYPE.OVERVIEW_PAGE_TOUR
      const steps = computed(() => tourStore.getTour(tourType))

      const handleOpen = () => {
        args.open = true
      }

      return { args, tourStore, tour, tourType, steps, handleOpen }
    },
    components: {
      List,
      ListItem,
      ListItemMeta,
      Skeleton,
      DropdownButton,
      Button,
      Avatar,
      Menu,
      MenuItem,
      Space,
      Divider,
      Tour,
      UserOutlined
    },
    template: `
      <Tour :steps="steps" v-model:open="args.open" @change="onChange" />

      <Button type="primary" @click="handleOpen(true)">Begin Tour</Button>
    
      <Divider/>
    
      <Space>
        <Button :ref="(ref) => tour.setTour(0, ref, tourType)">Upload</Button>
    
        <div >
          <DropdownButton :ref="(ref) => tour.setTour(1, ref, tourType)">
            Dropdown
            <template #overlay>
              <Menu>
                <MenuItem key="1">
                  <UserOutlined />
                  1st menu item
                </MenuItem>
                <MenuItem key="2">
                  <UserOutlined />
                  2nd menu item
                </MenuItem>
                <MenuItem key="3">
                  <UserOutlined />
                  3rd item
                </MenuItem>
              </Menu>
            </template>
          </DropdownButton>
        </div>
    
        <Button :ref="(ref) => tour.setTour(2, ref, tourType)" type="primary"
          >Save</Button
        >
      </Space>
    `
  })
}
