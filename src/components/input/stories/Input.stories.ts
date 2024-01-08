import { withActions } from '@storybook/addon-actions/decorator'
import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { Input } from '../src'

const meta: Meta<ComponentProps<typeof Input>> = {
  title: 'checkupuikit/Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'input label',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    },
    placeholder: {
      description: 'input placeholder',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    },
    allowClear: {
      description: '텍스트를 지우는 아이콘 사용 여부',
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    maxlength: {
      description: '최대 글자 수',
      control: {
        type: 'number'
      },
      table: {
        type: { summary: 'number' }
      }
    },
    showCount: {
      description: '글자 수 노출 여부',
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    type: {
      description: 'input 타입(text, password 등 HTML input type들)',
      type: { name: 'string' },
      options: ['text', 'password'],
      control: 'select',
      table: {
        type: {
          summary: 'text | password'
        },
        defaultValue: { summary: 'text' }
      }
    }
  },
  args: {
    label: 'label'
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
type Story = StoryObj<typeof Input>

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

export const MaxlengthAndShowCount: Story = {
  args: {
    ...Default.args,
    showCount: true,
    maxlength: 10
  }
}

export const TypePassword: Story = {
  args: {
    label: 'password',
    type: 'password'
  }
}
