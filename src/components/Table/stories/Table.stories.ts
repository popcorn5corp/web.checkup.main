import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { Table } from '..'
import { columns, dataSource } from './mock'

const meta: Meta<ComponentProps<typeof Table>> = {
  title: 'checkupuikit/Atoms/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      description: '테이블 칼럼 정보',
      table: {
        defaultValue: { summary: '[]' }
      }
    },
    dataSource: {
      description: '테이블 리스트 정보'
    },
    options: {
      description: '테이블 설정을 위한 옵션 정보'
    }
  },
  parameters: {
    // layout: 'fullscreen',
    componentSubtitle:
      '데이터 테이블은 구조화된 데이터 행의 모음을 표시하며 데이터 정렬, 페이지이동, 필터링 등의 기능을 제공합니다.'
  }
}

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  args: {
    columns,
    dataSource,
    options: {
      pointer: false,
      isShowNo: false,
      isPagination: false,
      isSelection: false
    }
  }
}

export const ShowNoColumn: Story = {
  args: {
    ...Default.args,
    options: {
      ...Default.args?.options,
      isShowNo: true
    }
  }
}

export const RowSelection: Story = {
  args: {
    ...Default.args,
    options: {
      ...Default.args?.options,
      isSelection: true
    }
  }
}

export const Pagination: Story = {
  args: {
    ...Default.args,
    options: {
      ...Default.args?.options,
      isShowNo: true,
      isPagination: true
    },
    pagination: {
      pageSize: 5
    }
  }
}

export const Sorting: Story = {
  args: {
    ...Pagination.args,
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
      }
    ]
  }
}
