import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { DynamicTable } from '../'
import { columns, dataSource } from './mock'

const meta: Meta<ComponentProps<typeof DynamicTable>> = {
  title: 'checkupuikit/Atoms/DynamicTable',
  component: DynamicTable,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle:
      'Dynamic Table은 기본적인 테이블 기능과 더불어 필터, CRUD, 레이아웃 변경, 검색기능 등을 제공하는 컴포넌트입니다.'
  }
}

export default meta
type Story = StoryObj<typeof DynamicTable>

export const Default: Story = {
  args: {
    columns,
    dataSource
  }
}
