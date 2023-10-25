import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { Button } from '@/components/button'
import { DynamicTable } from '../'
import { columns, dataSource } from './mock'

const meta: Meta<ComponentProps<typeof DynamicTable>> = {
  title: 'checkupuikit/Organism/DynamicTable',
  component: DynamicTable,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      description: '테이블 칼럼 정보',
      table: {
        type: { summary: 'ColumnType<RecordType>[]' },
        defaultValue: { summary: '[]' }
      }
    },
    dataSource: {
      description: '테이블 리스트 정보',
      table: {
        type: { summary: 'RecordType[] | undefined' },
        defaultValue: { summary: 'undefined' }
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
    showToolbar: {
      description: '테이블 툴바 노출 여부',
      type: { name: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    showFilter: {
      description: '테이블 필터 노출 여부',
      type: { name: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
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
    dataSource: [],
    columns: [],
    showToolbar: false,
    showFilter: false,
    loading: false
  },
  parameters: {
    componentSubtitle:
      'Dynamic Table은 기본적인 테이블 기능과 더불어 필터, CRUD, 레이아웃 변경, 검색기능 등을 제공하는 컴포넌트입니다.'
  }
}

export default meta
type Story = StoryObj<typeof DynamicTable>

export const Default: Story = {
  args: {
    ...meta.args,
    rowKey: 'id',
    columns,
    dataSource,
    showToolbar: true,
    showFilter: true
  }
}

export const FetchData: Story = {
  render: (args, { loaded, argTypes }) => ({
    components: { DynamicTable, Button },
    // props: Object.keys(argTypes),
    setup() {
      const dataSource = ref([])
      const loading = ref(false)
      const tableRef = ref()

      const fetchData = async (): Promise<void> => {
        loading.value = true
        dataSource.value = (
          await (await fetch('https://dummyjson.com/users?limit=30')).json()
        ).users
        loading.value = false
      }

      const clearData = (): void => {
        dataSource.value = []
      }

      return { args, dataSource, loading, columns, tableRef, fetchData, clearData }
    },
    template: `
      <div>
        <Button label="Fetch Data" @click="fetchData" />  
        <Button label="Clear Data" @click="clearData" style="margin-left: 10px"/>  
      </div>
     
      <DynamicTable ref="tableRef" v-bind="{ ...args }" :columns="columns" :dataSource="dataSource" :loading="loading"/>
    `
  }),
  args: {
    ...Default.args
  }
  // loaders: [
  //   async ({ args, argsByTarget }) => {
  //     return {
  //       response: await (await fetch('https://dummyjson.com/users?limit=30')).json()
  //     }
  //   }
  // ]
}
