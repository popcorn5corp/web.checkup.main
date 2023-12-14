import { withActions } from '@storybook/addon-actions/decorator'
import type { Meta, StoryObj } from '@storybook/vue3'
import { computed, ref } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import Button from '@/components/button/src/Button.vue'
import { Modal } from '../src'

type TemplateOptions = {
  positionCenter: boolean
  useTitle: boolean
  useDesc: boolean
  useBody: boolean
  useCancelBtn: boolean
  useOkBtn: boolean
}

const defaultOptions = computed(() => ({
  positionCenter: false,
  useTitle: true,
  useDesc: true,
  useBody: true,
  useCancelBtn: true,
  useOkBtn: true
}))

const meta: Meta<ComponentProps<typeof Modal>> = {
  title: 'checkupuikit/Atoms/Modal',
  component: Modal,
  tags: ['autodocs'],

  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      '사용자의 작업 흐름을 방해하지 않으면서 새 페이지로 이동하거나, 확인 창 등을 띄울때 Modal을 사용하여 현재 페이지 위에 새 부동 레이어를 만들어 사용자 피드백을 얻거나 정보를 표시할 수 있습니다.'
  },
  argTypes: {
    positionCenter: {
      description: '모달창 중간 위치여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    okBtnText: {
      description: '완료 버튼 텍스트',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: `완료` }
      }
    },
    useOkBtn: {
      description: '완료 버튼 사용여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true }
      }
    },
    cancelBtnText: {
      description: '취소 버튼 텍스트',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: `취소` }
      }
    },
    useCancelBtn: {
      description: '취소 버튼 사용여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true }
      }
    }
  },
  args: {
    ...defaultOptions.value,
    cancelBtnText: `취소`,
    okBtnText: `완료`
  },
  decorators: [withActions]
}

export default meta
type Story = StoryObj<typeof Modal>

const generateStory = (isChange: boolean, options: TemplateOptions): StoryObj<typeof Modal> => ({
  render: (args) => ({
    components: { Button, Modal },
    setup() {
      const isVisible = ref(false)

      const handleComplete = () => {
        isVisible.value = false
      }

      if (isChange) {
        args = options
      }

      return {
        args,
        options,
        isVisible,
        handleComplete
      }
    },
    template: `
      <div style="width: 100%; text-align: center; padding: 1rem 0">
        <Button label="Open Modal" @click="isVisible = true"/>
      </div>
      <Modal v-if="isVisible" @cancel="isVisible = false" @ok="handleComplete" :positionCenter="args.positionCenter" :cancelBtnText="args.cancelBtnText" :useCancelBtn="args.useCancelBtn" :useOkBtn="args.useOkBtn" :okBtnText="args.okBtnText">
        <template #title v-if="args.useTitle">모달 제목</template>
        <template #desciption v-if="args.useDesc">모달 설명</template>
        <template #body v-if="args.useBody">
          <div>
            모달 내용내용내용내용...<br />
            모달 내용내용내용내용내용내용...<br />
            모달 내용내용내용내용내용내용내용내용...<br />
          </div>
        </template>
      </Modal>
    `
  })
})

export const Default: Story = generateStory(false, defaultOptions.value)

export const PositionCenter: Story = generateStory(true, {
  ...defaultOptions.value,
  positionCenter: true
})

export const NoTitle: Story = generateStory(true, { ...defaultOptions.value, useTitle: false })

export const NoDesc: Story = generateStory(true, { ...defaultOptions.value, useDesc: false })

export const NoBody: Story = generateStory(true, { ...defaultOptions.value, useBody: false })

export const NoCancelBtn: Story = generateStory(true, {
  ...defaultOptions.value,
  useCancelBtn: false
})

export const NoOkBtn: Story = generateStory(true, { ...defaultOptions.value, useOkBtn: false })
