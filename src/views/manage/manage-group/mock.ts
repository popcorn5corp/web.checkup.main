import type { TableColumnsType } from 'ant-design-vue'
import dayjs from 'dayjs'

export const columns: TableColumnsType = [
  {
    title: '그룹명',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '사용자수',
    dataIndex: 'content',
    key: 'content'
  },
  {
    title: '생성일',
    dataIndex: 'createdAt',
    key: 'createdAt',
    customRender: ({ text }) => {
      return dayjs.unix(text).format('YYYY-MM-DD')
    }
  },
  {
    title: '상태',
    dataIndex: 'status',
    key: 'status',
    customRender: ({ value }) => {
      return value.label
    }
  }
]
