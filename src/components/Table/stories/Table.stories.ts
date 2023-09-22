import { withActions } from '@storybook/addon-actions/decorator'
import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { Table } from '..'
import { columns, dataSource, sortedColumns } from './mock'

const meta: Meta<ComponentProps<typeof Table>> = {
  title: 'checkupuikit/Atoms/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      description: '테이블 칼럼 정보',
      table: {
        type: { summary: 'ColumnType<RecordType>[]' }
      }
    },
    dataSource: {
      description: '테이블 리스트 정보',
      table: {
        type: { summary: 'RecordType[]' }
      }
    },
    options: {
      description: '테이블 설정을 위한 옵션 정보',
      table: {
        type: {
          summary: 'TableOptions',
          detail:
            '{ pointer: boolean, isShowNo: boolean, isPagination: boolean, isSelection: boolean }'
        },
        defaultValue: {
          detail: '{ pointer: false, isShowNo: false, isPagination: false, isSelection: false }'
        }
      }
    },
    loading: {
      description: '테이블 로딩 스피너',
      type: { name: 'boolean' },
      table: {
        type: { summary: 'boolean' }
      }
    }
  },
  args: {
    columns: [],
    dataSource: []
  },
  parameters: {
    componentSubtitle:
      '데이터 테이블은 구조화된 데이터 행의 모음을 표시하며 데이터 정렬, 페이지이동, 필터링 등의 기능을 제공합니다.',
    actions: {
      // handles: ['mouseover', 'click .btn']
    }
  },
  decorators: [withActions]
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

export const EmptyData: Story = {
  args: {
    ...Default.args,
    dataSource: [],
    options: {
      ...Default.args?.options
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
    columns: sortedColumns
  }
}
