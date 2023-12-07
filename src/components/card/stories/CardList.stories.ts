import checkupLogo from '@/assets/images/checkup_logo_simple_light.png'
import { withActions } from '@storybook/addon-actions/decorator'
import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { baseContent } from '@/views/components-overview/Card/mock'
import { CardList } from '../src'

const meta: Meta<ComponentProps<typeof CardList>> = {
  /**
   * useCheckbox 와 imgPreview
   * 는 같이 사용 할 수 없음
   */
  title: 'checkupuikit/Atoms/CardList',
  component: CardList,
  tags: ['autodocs'],
  argTypes: {
    useCheckbox: {
      description: '카드 체크박스 사용 유무',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    size: {
      description: '카드 리스트 크기',
      type: { name: 'string' },
      options: ['middle', 'large'],
      control: 'select',
      table: {
        type: {
          summary: 'middle | large'
        },
        defaultValue: { summary: 'middle' }
      }
    },
    items: {
      description: '카드 내용'
    },
    imgUrl: {
      description: '카드 커버 이미지',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    },
    detailBtnPosition: {
      description: '카드 상세보기 스타일 타입',
      type: { name: 'string' },
      options: ['middle', 'bottom'],
      control: 'select',
      table: {
        type: {
          summary: 'middle | bottom'
        },
        defaultValue: { summary: 'middle' }
      }
    },
    imgPreview: {
      description: '카드 이미지 미리보기 기능 사용 유무',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true }
      }
    }
  },
  args: {
    useCheckbox: false,
    imgPreview: true,
    imgUrl: checkupLogo,
    items: baseContent
  },
  parameters: {
    componentSubtitle: '카드 컴포넌트를 사용하여 카드 리스트를 구현 할 수 있습니다.',
    actions: {}
  },
  decorators: [withActions]
}
export default meta
type Story = StoryObj<typeof CardList>

export const Default: Story = {
  args: {
    items: baseContent
  }
}

export const MiddleSize: Story = {
  args: {
    ...Default.args,
    size: 'middle',
    detailBtnPosition: 'bottom'
  }
}

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'large',
    detailBtnPosition: 'bottom'
  }
}

export const DetailButtonPositionMiddle: Story = {
  args: {
    ...Default.args,
    detailBtnPosition: 'middle'
  }
}

export const DetailButtonPositionBottom: Story = {
  args: {
    ...Default.args,
    detailBtnPosition: 'bottom'
  }
}

export const ImgPreview: Story = {
  args: {
    ...Default.args,
    imgUrl: checkupLogo,
    imgPreview: true
  }
}

export const Checkbox: Story = {
  args: {
    ...Default.args,
    imgUrl: checkupLogo,
    useCheckbox: true
  }
}
