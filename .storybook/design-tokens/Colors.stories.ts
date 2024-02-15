import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import Colors from '../components/Colors.vue'

const meta: Meta<ComponentProps<typeof Colors>> = {
  title: 'checkupuikit/design-tokens/ColorPalette',

  component: Colors,
  tags: ['autodocs'],
  argTypes: {},

  args: {}
}

export default meta
type Story = StoryObj<typeof Colors>

export const Default: Story = {}
// export const Default: Story = {
//   args: {
//     tabs: [
//       { title: 'Tab 1', key: '1' },
//       { title: 'Tab 2', key: '2' },
//       { title: 'Tab 3', key: '3', closable: false }
//     ]
//   }
// }

// export const TitleIcon: Story = {
//   args: {
//     tabs: [
//       { title: 'Tab 1', content: 'Content of Tab 1', icon: DownloadOutlined, key: '1' },
//       { title: 'Tab 2', content: 'Content of Tab 2', icon: CloudOutlined, key: '2' },
//       { title: 'Tab 3', content: 'Content of Tab 3', icon: PhoneFilled, key: '3', closable: false }
//     ]
//   }
// }

// export const TextContent: Story = {
//   args: {
//     tabs: [
//       { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
//       { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
//       { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false }
//     ]
//   }
// }

// export const ComponentContent: Story = {
//   args: {
//     tabs: [
//       { title: 'Tab 1', component: <Button label="First" type="primary" />, key: '1' },
//       { title: 'Tab 2', component: <Button label="Second" type="dashed" />, key: '2' },
//       { title: 'Tab 3', component: <Button label="Third" type="link" />, key: '3', closable: false }
//     ]
//   }
// }

// export const PositionLeft: Story = {
//   args: {
//     ...Default.args,
//     tabPosition: 'left'
//   }
// }

// export const PositionRight: Story = {
//   args: {
//     ...Default.args,
//     tabPosition: 'right'
//   }
// }

// export const PositionBottom: Story = {
//   args: {
//     ...Default.args,
//     tabPosition: 'bottom'
//   }
// }
