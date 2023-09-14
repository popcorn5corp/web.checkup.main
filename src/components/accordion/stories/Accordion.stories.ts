import { QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { Select as ASelect } from 'ant-design-vue'
import { ref } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import {
  Checkbox,
  Datepicker,
  Radio,
  RangeDatePicker,
  Select
} from '@/components/dynamic-table/src/components'
import { filterList } from '@/components/dynamic-table/src/components/mock'
import { Accordion, AccordionPanel } from '../src'

const meta: Meta<ComponentProps<typeof Accordion>> = {
  title: 'checkupuikit/Atoms/Accordion',
  component: Accordion,
  tags: ['autodocs'],

  // Set Component description
  parameters: {
    layout: 'fullscreen',

    componentSubtitle: '아코디언은 복잡한 영역을 그룹화하거나 숨기기 위해 사용할 수 있습니다.',
    docs: {
      description: {
        component: `아코디언은 **Children 컴포넌트**로 **<code>&lt;AccordionPanel/&gt; </code>**를 사용할 수 있습니다.`
      }
    }
  },

  // Set Args Table Description
  argTypes: {
    expandIconPosition: {
      description: 'Set expand icon position',
      type: { name: 'string', required: false },
      control: 'radio',
      options: ['start', 'end'],
      defaultValue: 'start',
      table: {
        category: 'Custom',
        type: {
          summary: 'start | end'
        }
      }
    },
    items: {
      description: 'accordion-panel create data',
      table: {
        type: {
          summary: 'array'
        }
      }
    },
    bordered: {
      description: 'Toggles rendering of the border around the collapse block',
      type: { name: 'boolean' },
      table: {
        category: 'Custom',
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    ghost: {
      description: 'Make the collapse borderless and its background transparent',
      type: { name: 'boolean' },
      table: {
        category: 'Custom',
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    }
  },

  // Set Args Default Data
  args: {
    ghost: false,
    bordered: false,
    expandIconPosition: 'start'
  }
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  args: {
    items: [
      {
        title: 'This is panel header 1',
        key: '1',
        text: ' A dog is a type of domesticated animal. Known for its loyalty and faithfulness'
      },
      {
        title: 'This is panel header 2',
        key: '2',
        text: ' A dog is a type of domesticated animal. Known for its loyalty and faithfulness'
      },
      {
        title: 'This is panel header 3',
        key: '3',
        text: ' A dog is a type of domesticated animal. Known for its loyalty and faithfulness'
      }
    ]
  },

  render: (args) => ({
    components: { Accordion, AccordionPanel },
    setup() {
      return { args }
    },
    template: ` 
      <Accordion v-bind="args" :items="args.items">
        <template #content="{ item }">
          {{item.text}}
        </template>
      </Accordion>
    `
  })
}

export const Ghost: Story = {
  args: { ...Default.args, ghost: true },
  render: Default.render
}

export const Bordered: Story = {
  args: { ...Default.args, bordered: true },
  render: Default.render
}

export const PositionArrow: Story = {
  args: Default.args,
  render: (args) => ({
    setup() {
      const expandIconPosition = ref('end')
      const options = ['start', 'end']
      return { args, expandIconPosition, options }
    },
    components: { Accordion, AccordionPanel, ASelect },
    template: ` 
      <ASelect
        v-model:value="expandIconPosition"
        style="margin:1rem"
        :options="options.map(item => ({ value: item }))"
      />

      <Accordion v-bind="args" :items="args.items" :expand-icon-position="expandIconPosition">
        <template #content="{ item }">
          {{item.text}}
        </template>
      </Accordion>
    `
  })
}

export const CustomIcon: Story = {
  render: () => ({
    components: { Accordion, AccordionPanel, SettingOutlined, QuestionCircleOutlined },

    template: ` 
      <Accordion expand-icon-position="end" >
        <AccordionPanel header="This is panel header 1" text="A dog is a type of domesticated animal. Known for its loyalty and faithfulness">
          <template #extra><SettingOutlined /></template>
        </AccordionPanel>

        <AccordionPanel header="This is panel header 2" text="A dog is a type of domesticated animal. Known for its loyalty and faithfulness">
          <template #extra><QuestionCircleOutlined /></template>
        </AccordionPanel>
      </Accordion>
    `
  })
}

export const CustomFilter: Story = {
  render: () => ({
    components: { Accordion, AccordionPanel, Checkbox, Datepicker, Radio, RangeDatePicker, Select },
    setup() {
      const dynamicComponents = {
        checkbox: Checkbox,
        datepicker: Datepicker,
        rangeDatePicker: RangeDatePicker,
        select: Select,
        radio: Radio
      }

      return { dynamicComponents, args: filterList }
    },
    template: ` 
      <Accordion :items="args" style="width: 30%; font-weight: bold; font-size: 16px" ghost>
        <template #content="{ item }">
             <component :is="dynamicComponents[item.type]" :item="item" /> 
        </template>
      </Accordion>
    `
  })
}
