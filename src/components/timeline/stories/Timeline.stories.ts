import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import AlternateTimeline from '@/views/components-overview/timeline/components/AlternateTimeline.vue'
import ReserveLoadingTimeline from '@/views/components-overview/timeline/components/ReserveLoadingTimeline.vue'
import { Timeline } from '../src'

const meta: Meta<ComponentProps<typeof Timeline>> = {
  title: 'checkupuikit/Atoms/Timeline',
  component: Timeline,
  tags: ['autodocs'],

  // Set Component description
  parameters: {
    layout: 'fullscreen',

    componentSubtitle:
      '일련의 정보를 시간별로 정렬해야 하는 경우, 시각적 연결을 위해 타임라인이 필요한 경우에 사용할 수 있습니다. ',
    docs: {
      description: {
        component: `타임라인의 **Children 컴포넌트**로 **<code>&lt;TimelineItem/&gt; </code>를 사용할 수 있습니다.`
      }
    }
  },

  argTypes: {
    items: {
      description: '타임라인 데이터'
    },
    default: {
      description: '기본 슬롯, 타임라인 컴포넌트의 자식 컴포넌트인 <Timeline.Item> 사용',
      table: {
        type: ''
      }
    },
    reload: {
      description: '버튼 클릭 이벤트',

      table: {
        type: 'event'
      }
    },
    ['button-text']: {
      description: '버튼 텍스트 슬롯',
      type: { name: 'string' },

      table: {
        type: 'string'
      }
    }
  },

  args: {
    loading: false,
    pagination: true,
    ['button-text']: '더 불러오기'
  }
}

export default meta
type Story = StoryObj<typeof Timeline>

export const Default: Story = {
  args: {
    items: [
      {
        issuedDate: '2024-01-02',
        logs: [
          {
            logId: 'a35cf87f-8b03-4f63-bed0-02f64b891c43',
            status: {
              label: '가입',
              value: 'JOIN'
            },
            uid: 'faad2d48-5297-4980-8529-81f2b86d1af1',
            nickname: '김길동',
            createTime: '18:09'
          },
          {
            logId: '791ed4b5-4918-47b2-b3e0-6230401256b6',
            status: {
              label: '생성',
              value: 'CREATE'
            },
            uid: 'faad2d48-5297-4980-8529-81f2b86d1af1',
            nickname: '이길동',
            createTime: '18:09'
          }
        ]
      },
      {
        issuedDate: '2024-01-05',
        logs: [
          {
            logId: 'a35cf87f-8b03-4f63-bed0-02f64b891c43',
            status: {
              label: '가입',
              value: 'JOIN'
            },
            uid: 'faad2d48-5297-4980-8529-81f2b86d1af1',
            nickname: '박길동',
            createTime: '18:09'
          },
          {
            logId: '791ed4b5-4918-47b2-b3e0-6230401256b6',
            status: {
              label: '생성',
              value: 'CREATE'
            },
            uid: 'faad2d48-5297-4980-8529-81f2b86d1af1',
            nickname: '홍길동',
            createTime: '18:09'
          }
        ]
      }
    ]
  },
  render: (args) => ({
    components: { Timeline },
    setup() {
      function onReload() {
        args.loading = true
        setTimeout(() => {
          args.loading = false
        }, 400)
      }
      return { args, onReload }
    },

    template: `
      <Timeline v-bind="args"  @reload="onReload">
        <template #button-text>
          {{ args['button-text'] }}
        </template>
      </Timeline>
    `
  })
}

export const CustomAlternateTimeline: Story = {
  render: () => ({
    components: { AlternateTimeline },

    template: `<AlternateTimeline/>`
  })
}

export const CustomReserveLoadingTimeline: Story = {
  render: () => ({
    components: { ReserveLoadingTimeline },

    template: `<ReserveLoadingTimeline/>`
  })
}
