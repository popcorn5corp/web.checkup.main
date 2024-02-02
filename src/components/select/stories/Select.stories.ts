import { withActions } from '@storybook/addon-actions/decorator'
import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { Select } from '../src'

const options = [
  {
    label: '활성',
    value: 'ACTIVE'
  },
  {
    label: '비활성',
    value: 'INACTIVE'
  },
  {
    label: '탈퇴',
    value: 'WITHDRAWN'
  },
  {
    label: '퇴출',
    value: 'REVOKE'
  }
]

const meta: Meta<ComponentProps<typeof Select>> = {
  title: 'checkupuikit/Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: '라벨 텍스트',

      table: {
        type: { summary: 'string' }
      }
    },
    width: {
      description: '라벨 넓이 조정',
      table: {
        type: { summary: 'string' }
      }
    },
    options: {
      description: '선택 옵션값',
      control: {
        type: 'array'
      },
      table: {
        type: { summary: 'array' }
      }
    },
    placeholder: {
      description: '선택시 표출되는 placeholder',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    },
    allowClear: {
      description: '선택항목을 지우는 아이콘 사용 여부',
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    }
  },
  args: {
    placeholder: '내용을 선택해주세요.',
    width: '300px',
    options: options,
    allowClear: false
  },
  parameters: {
    componentSubtitle:
      '사용자 입력을 받기 위한 텍스트 필드입니다. 데이터를 제공하거나 변경하기 위해 키보드와 마우스를 사용할 수 있습니다.',
    docs: {
      description: {
        component: `label이 input 안에 위치하다가 클릭하면 상단으로 올라가는 스타일을 가진 input 컴포넌트입니다.`
      }
    }
  },
  decorators: [withActions]
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    label: 'label'
  }
}

export const Placeholder: Story = {
  args: {
    ...Default.args,
    placeholder: 'OO를 입력해주세요.'
  }
}

export const AllowClear: Story = {
  args: {
    ...Default.args,
    allowClear: true
  }
}
