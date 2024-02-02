import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import DefaultSearchSelect from '@/views/components-overview/search-select/components/DefaultSearchSelect.vue'
import ImgSearchSelect from '@/views/components-overview/search-select/components/ImgSearchSelect.vue'
import { CheckOutlined } from '@/components/icons'
import { SearchSelect } from '../'

const meta: Meta<ComponentProps<typeof SearchSelect>> = {
  title: 'checkupuikit/Atoms/SearchSelect',
  component: SearchSelect,
  tags: ['autodocs'],

  parameters: {
    docs: {},
    componentSubtitle: `SearchSelect 컴포넌트는 선택 요소의 정보를 다양하게 보여줄 수 있습니다. `
  },

  argTypes: {
    statusDisabledText: {
      description: '비활성화 상태일 경우 텍스트 표현',
      table: {
        type: { summary: 'string' }
      }
    },
    statusSelectedText: {
      description: '선택된 상태일 경우 텍스트 표현',
      table: {
        type: { summary: 'string' }
      }
    },
    width: {
      description: '넓이 조정',
      type: { name: 'string' },
      table: {
        type: { summary: 'px, %, em, ref ...' },
        defaultValue: { summary: '50%' }
      }
    },
    options: {
      control: Object,
      table: {
        type: { summary: 'SelectOptions[]' }
      }
    },
    pagination: {
      control: Object,
      description: '데이터 Pagination 정보',
      table: {
        type: { summary: 'Recordable' }
      }
    },

    ['update:modelValue']: {
      description: '선택된 데이터 목록',
      control: Object,
      table: {
        type: { summary: 'Array' }
      }
    },
    search: {
      description: '검색시 호출되는 Callback',
      control: Object,
      table: { type: { summary: '() => void' } }
    }
  },

  args: {
    width: '700px',
    statusSelectedText: '선택됨',
    statusDisabledText: '비활성화',
    placeholder: '텍스트를 입력해주세요.'
  }
}

export default meta
type Story = StoryObj<typeof SearchSelect>

export const Default: Story = {
  render: (args) => ({
    components: { SearchSelect, CheckOutlined },
    setup() {
      const options = ref()
      fetch('https://randomuser.me/api/?results=5')
        .then((response) => response.json())
        .then((data) => {
          options.value = data.results.map((user: any, index: any) => ({
            label: `${user.name.first} ${user.name.last}`,
            description: `(${user.email})`,
            value: user.name.first,
            prefixImg: user.picture.large,
            disabled: index % 2 === 0 ? false : true
          }))
        })

      return { args, options }
    },
    template: `
      <SearchSelect v-bind="args" :options="options" :placeholder="args.placeholder">
        <template #statusDisabledText>{{args.statusDisabledText}}</template>
        <template #statusSelectedText>{{args.statusSelectedText}}</template>
      </SearchSelect>
    `
  })
}

export const CustomImgSearchSelect: Story = {
  render: (args) => ({
    components: {
      ImgSearchSelect
    },

    setup() {
      return { args }
    },

    template: `<ImgSearchSelect width="args.width"/>`
  })
}

export const CustomSearchSelect: Story = {
  render: (args) => ({
    components: {
      DefaultSearchSelect
    },

    setup() {
      return { args }
    },
    template: `<DefaultSearchSelect width="args.width"/>`
  })
}
