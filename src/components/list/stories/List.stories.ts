import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { List, ListItem, ListItemMeta } from '../src'

const meta: Meta<ComponentProps<typeof List>> = {
  title: 'checkupuikit/Atoms/List',
  component: List,
  tags: ['autodocs'],

  // Set Component description
  parameters: {
    layout: 'fullscreen',

    componentSubtitle:
      '하나의 주제와 관련된 내용을 표시하는 데 사용될 수 있습니다. 내용은 다양한 유형과 크기의 여러 요소로 구성될 수 있습니다.',
    docs: {
      description: {
        component: `리스트의 **Children 컴포넌트**로 **<code>&lt;ListItem/&gt; </code>,<code>&lt;ListItemMeta/&gt; </code>**를 사용할 수 있습니다.`
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof List>

export const Default: Story = {
  args: {
    dataSource: []
  },

  render: (args) => ({
    components: { List, ListItem, ListItemMeta },
    setup() {
      return { args }
    },
    template: ` `
  })
}
