import checkupLogo from '@/assets/images/checkup_logo_simple_light.png'
import { withActions } from '@storybook/addon-actions/decorator'
import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { baseContent } from '@/views/ComponentsOverview/Card/mock'
import { Card, CardList } from '../src'

const meta: Meta<ComponentProps<typeof Card>> = {
  // type card
  /**
   * (useCheckbox || detailBtnText) 와 imgPreview
   * 는 같이 사용 할 수 없음
   */
  title: 'checkupuikit/Atoms/Card',
  component: CardList,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: '카드 제목',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    },
    useCheckbox: {
      description: '카드 체크박스 사용 유무',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    content: {
      description: '카드 내용',
      control: {
        type: 'text'
      },
      table: {
        type: {
          summary: 'ContentData[] | VNode | string',
          detail:
            'ContentData : { id: string, division: string, createdAt: number, contents: {key: string,label: string,value: string} }'
        }
      }
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
    detailBtnText: {
      description: '카드 상세보기 버튼 내용',
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
    },
    tag: {
      description: '카드 내용의 구분 태그',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    }
  },
  args: {
    useCheckbox: false,
    imgPreview: true,
    imgUrl: checkupLogo,
    detailBtnText: '상세보기',
    detailBtnPosition: 'bottom'
  },
  parameters: {
    componentSubtitle:
      '카드 컴포넌트를 사용하여 단일 주제와 관련된 콘텐츠를 표시할 수 있습니다. 콘텐츠는 다양한 유형과 크기의 여러 요소로 구성될 수 있습니다.',
    actions: {}
  },
  decorators: [withActions]
}
export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    content: '카드 컴포넌트를 사용하여 단일 주제와 관련된 콘텐츠를 표시할 수 있습니다.'
  }
}

export const DetailButtonPositionMiddle: Story = {
  args: {
    ...Default.args,
    title: '카드 제목',
    detailBtnText: '상세보기',
    detailBtnPosition: 'middle'
  }
}

export const DetailButtonPositionBottom: Story = {
  args: {
    ...Default.args,
    title: '카드 제목',
    detailBtnText: '상세보기',
    detailBtnPosition: 'bottom'
  }
}

export const ImgPreview: Story = {
  args: {
    ...Default.args,
    title: '카드 제목',
    content: '카드 컴포넌트를 사용하여 단일 주제와 관련된 콘텐츠를 표시할 수 있습니다.',
    imgUrl: checkupLogo,
    imgPreview: true
  }
}

export const Checkbox: Story = {
  args: {
    ...Default.args,
    title: '카드 제목',
    imgUrl: checkupLogo,
    useCheckbox: true
  }
}

export const Card_List: Story = {
  args: {
    ...Default.args,
    title: '카드 제목',
    imgUrl: checkupLogo,
    useCheckbox: true,
    content: baseContent
  }
}
