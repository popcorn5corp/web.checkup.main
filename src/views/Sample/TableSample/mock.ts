import type { TableColumnsType } from 'ant-design-vue'
import dayjs from 'dayjs'
import { FILTER_UI, type FilterList } from '@/components/filter-form'

export const columns: TableColumnsType = [
  {
    title: '게시물 제목',
    dataIndex: 'boardTitle',
    key: 'boardTitle'
    // sorter: {
    //   compare: (a, b) => a.boardTitle - b.boardTitle,
    //   multiple: 1
    // }
  },
  {
    title: '게시물 내용',
    dataIndex: 'boardContent',
    key: 'boardContent'
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
    title: '권한',
    dataIndex: 'permission',
    key: 'permission'
  },
  {
    title: '게시물 구분',
    dataIndex: 'division',
    key: 'division'
  }
]

export const filters: FilterList = [
  {
    title: '조회기간',
    order: 1,
    key: ['searchStartDate', 'searchEndDate'],
    type: FILTER_UI.RANGE_DATE_PICKER,
    options: []
  },
  {
    title: '게시물 구분',
    order: 2,
    key: ['division'],
    type: FILTER_UI.RADIO,
    options: [
      { label: '공개', value: 'PUBLIC' },
      { label: '비공개', value: 'PRIVATE' }
    ]
  },
  {
    title: '권한',
    order: 3,
    key: ['permission'],
    type: FILTER_UI.CHECKBOX,
    options: [
      { label: '관리자', value: 'ADMIN' },
      { label: '일반', value: 'NORMAL' },
      { label: '게스트', value: 'GUEST' }
    ]
  }
]
