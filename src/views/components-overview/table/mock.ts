import type { TableColumnsType } from 'ant-design-vue'
import dayjs from 'dayjs'

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
    title: '게시물 구분',
    dataIndex: 'division',
    key: 'division'
  }
]
