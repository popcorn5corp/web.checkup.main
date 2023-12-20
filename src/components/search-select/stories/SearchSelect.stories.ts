import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import DefaultSearchSelect from '@/views/components-overview/search-select/components/DefaultSearchSelect.vue'
import ImgSearchSelect from '@/views/components-overview/search-select/components/ImgSearchSelect.vue'
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
    search: {
      description: '검색 이벤트',
      table: {
        type: { summary: 'event' }
      }
    },
    width: {
      description: '넓이 조정',
      table: {
        type: { summary: 'string' }
      }
    },
    options: {
      description: '리스트 정보',
      table: {
        type: { summary: 'SelectOptions[]' }
      }
    },
    pagination: {
      description: '데이터 Pagination 정보',
      table: {
        type: { summary: 'Recordable' }
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof SearchSelect>

export const CustomImgSearchSelect: Story = {
  render: () => ({
    components: {
      ImgSearchSelect
    },

    template: `<ImgSearchSelect/>`
  })
}

export const CustomSearchSelect: Story = {
  render: () => ({
    components: {
      DefaultSearchSelect
    },
    template: `<DefaultSearchSelect/>`
  })
}
