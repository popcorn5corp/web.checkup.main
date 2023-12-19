import type { TableColumnsType } from 'ant-design-vue'
import { FILTER_UI, type FilterList } from '@/components/filter-form'

export const columns: TableColumnsType = [
  {
    title: '이름',
    dataIndex: 'nickname',
    key: 'nickname'
  },
  {
    title: '이메일',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '핸드폰',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: '가입일',
    dataIndex: 'joinDate',
    key: 'joinDate'
  },
  {
    title: '상태',
    dataIndex: 'userStatus',
    key: 'userStatus',
    customRender: ({ value }) => {
      return value.label
    }
  }
]
