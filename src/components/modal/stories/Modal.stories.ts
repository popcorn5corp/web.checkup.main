import { withActions } from '@storybook/addon-actions/decorator'
import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import Button from '@/components/button/src/Button.vue'
import { Modal } from '../src'

type TemplateOptions = {
  isCenter: boolean
  useTitle: boolean
  useDesc: boolean
  useBody: boolean
  useCloseBtn: boolean
  useCompleteBtn: boolean
}

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
    }
  },
  args: {
    positionCenter: false
  },
  decorators: [withActions]
}

export default meta
type Story = StoryObj<typeof Modal>

const defaultOptions = {
  isCenter: false,
  useTitle: true,
  useDesc: true,
  useBody: true,
  useCloseBtn: true,
  useCompleteBtn: true
}

const baseTemplate = ({
  isCenter,
  useTitle,
  useDesc,
  useBody,
  useCloseBtn,
  useCompleteBtn
}: TemplateOptions) => {
  return `<div style="width: 100%; text-align: center; padding: 1rem 0">
    <Button label="Open Modal" @click="isVisible = true"/>
  </div>
  <Modal v-if="isVisible" @close="isVisible = false" :positionCenter="${isCenter}">
    <template #title v-if="${useTitle}">모달 제목</template>
    <template #desciption v-if="${useDesc}">모달 설명</template>
    <template #body v-if="${useBody}">
      <div>
        모달 내용내용내용내용...<br />
        모달 내용내용내용내용내용내용...<br />
        모달 내용내용내용내용내용내용내용내용...<br />
      </div>
    </template>
    <template #closeBtn v-if="${useCloseBtn}">
      <Button label="취소" @click="isVisible = false" />
    </template>
    <template #completeBtn v-if="${useCompleteBtn}">
      <Button label="완료" type="primary" @click="handleComplete" />
    </template>
  </Modal>`
}

const generateStory = (options: TemplateOptions): StoryObj<typeof Modal> => ({
  render: (args) => ({
    components: { Button, Modal },
    setup() {
      const isVisible = ref(false)

      const handleComplete = () => {
        isVisible.value = false
      }

      return {
        ...args,
        isVisible,
        handleComplete
      }
    },
    template: baseTemplate(options)
  })
})

export const Default: Story = generateStory(defaultOptions)

export const PositionCenter: Story = generateStory({ ...defaultOptions, isCenter: true })

export const NoTitle: Story = generateStory({ ...defaultOptions, useTitle: false })

export const NoDesc: Story = generateStory({ ...defaultOptions, useDesc: false })

export const NoBody: Story = generateStory({ ...defaultOptions, useBody: false })

export const NoCloseBtn: Story = generateStory({ ...defaultOptions, useCloseBtn: false })

export const NoCompleteBtn: Story = generateStory({ ...defaultOptions, useCompleteBtn: false })
