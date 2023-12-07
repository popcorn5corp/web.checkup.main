import type { TableColumnsType } from 'ant-design-vue'
import dayjs from 'dayjs'
import { FILTER_UI, type FilterList } from '@/components/filter-form'

export const columns: TableColumnsType = [
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name'
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
    dataIndex: 'joinedAt',
    key: 'joinedAt',
    customRender: ({ text }) => {
      return dayjs.unix(text).format('YYYY-MM-DD')
    }
  },
  {
    title: '상태',
    dataIndex: 'status',
    key: 'status'
  }
]

export const filters: FilterList = [
  {
    title: '상태',
    order: 3,
    key: ['status'],
    type: FILTER_UI.CHECKBOX,
    options: [
      { label: '관리자', value: 'ADMIN' },
      { label: '일반', value: 'NORMAL' },
      { label: '게스트', value: 'GUEST' }
    ]
  }
]
