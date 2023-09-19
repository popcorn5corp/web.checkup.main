import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { Button } from '@/components/button'
import { CloudOutlined, DownloadOutlined, PhoneFilled } from '@/components/icons'
import { Tabs } from '..'

const meta: Meta<ComponentProps<typeof Tabs>> = {
  title: 'checkupuikit/Atoms/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      description: '탭 목록'
    },
    tabPosition: {
      description: '탭 위치'
    },
    type: {
      description: '탭 기본 스타일'
    }
  },
  parameters: {
    componentSubtitle: 'Tabs 컴포넌트는 콘텐츠 영역을 접거나 펼칠 수 있도록 합니다.',
    docs: {
      description: {
        component: `Tabs 컴포넌트는 **Children 컴포넌트**로 **<code>&lt;TabPane/&gt; </code>**를 사용할 수 있습니다.`
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  // render: () => ({
  //   components: { Tabs },
  //   setup() {
  //     const tabs: TabList = [
  //       { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
  //       { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
  //       { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false }
  //     ]
  //     return {
  //       args: {
  //         tabs
  //       }
  //     }
  //   },
  //   template: `
  //     <Tabs v-bind="args"></Tabs>
  //   `
  // }),
  args: {
    tabs: [
      { title: 'Tab 1', key: '1' },
      { title: 'Tab 2', key: '2' },
      { title: 'Tab 3', key: '3', closable: false }
    ]
  }
}

export const TitleIcon: Story = {
  args: {
    tabs: [
      { title: 'Tab 1', content: 'Content of Tab 1', icon: DownloadOutlined, key: '1' },
      { title: 'Tab 2', content: 'Content of Tab 2', icon: CloudOutlined, key: '2' },
      { title: 'Tab 3', content: 'Content of Tab 3', icon: PhoneFilled, key: '3', closable: false }
    ]
  }
}

export const TextContent: Story = {
  args: {
    tabs: [
      { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
      { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false }
    ]
  }
}

export const ComponentContent: Story = {
  args: {
    tabs: [
      { title: 'Tab 1', component: <Button label="First" type="primary" />, key: '1' },
      { title: 'Tab 2', component: <Button label="Second" type="dashed" />, key: '2' },
      { title: 'Tab 3', component: <Button label="Third" type="link" />, key: '3', closable: false }
    ]
  }
}

export const PositionLeft: Story = {
  args: {
    ...Default.args,
    tabPosition: 'left'
  }
}

export const PositionRight: Story = {
  args: {
    ...Default.args,
    tabPosition: 'right'
  }
}

export const PositionBottom: Story = {
  args: {
    ...Default.args,
    tabPosition: 'bottom'
  }
}
