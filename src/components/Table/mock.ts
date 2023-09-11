import type { TableColumnsType } from 'ant-design-vue'
import dayjs from 'dayjs'
import { ref } from 'vue'
import { type Filter, FilterTypes } from './interface'

// import i18n from '@/locales';

export const columns = ref<TableColumnsType>([
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
])

export const filterList: Filter[] = [
  {
    type: FilterTypes.DATE_PICKER,
    title: '날짜선택',
    options: [],
    selectedItems: []
  },
  {
    type: FilterTypes.RANGE_DATE_PICKER,
    title: '조회기간',
    options: [],
    selectedItems: []
  },
  {
    type: FilterTypes.SELECT,
    title: '반입장비',
    options: [
      { label: '고소작업', value: 1 },
      { label: '화기작업', value: 2 },
      { label: '밀폐작업', value: 3 },
      { label: '화기작업', value: 4 }
    ],
    selectedItems: []
  },
  {
    type: FilterTypes.CHECKBOX,
    title: '작업유형',
    options: [
      { label: '일반공사', value: 1 },
      { label: '전기공사', value: 2 },
      { label: '기계공사', value: 3 },
      { label: '소방공사', value: 4 }
    ],
    selectedItems: []
  },
  {
    type: FilterTypes.RADIO,
    title: '상태',
    options: [
      { label: '해당없음', value: false },
      { label: '해당있음', value: true }
    ],
    selectedItems: []
  }
]
