import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import OverviewTour from '@/views/components-overview/tour/components/Tour.vue'
import { Tour } from '@/components/tour'

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
    }
  }
}

export default meta
type Story = StoryObj<typeof Tour>

export const Primary: Story = {
  render: (args) => ({
    setup() {
      return { args }
    },
    components: { OverviewTour },
    template: `<OverviewTour v-bind="args"/>`
  })
}
