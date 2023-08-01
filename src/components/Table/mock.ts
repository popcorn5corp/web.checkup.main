import { ref } from 'vue'
import { FilterTypes, type Filter } from './types'
import type { TableColumnsType } from 'ant-design-vue'

export const columns = ref<TableColumnsType>([
  {
    title: '게시물 제목',
    dataIndex: 'boardTitle',
    key: 'boardTitle'
  },
  {
    title: '게시물 내용',
    dataIndex: 'boardContent',
    key: 'boardContent'
  },
  {
    title: '생성일',
    dataIndex: 'createdAt',
    key: 'createdAt'
  },
  {
    title: '게시물 구분',
    dataIndex: 'division',
    key: 'division'
  }
])

export const filterList: Filter[] = [
  {
    type: FilterTypes.DATEPICKER,
    title: '조회날짜',
    open: true,
    options: [],
    selectedItems: []
  },
  {
    type: FilterTypes.RANGEDATEPICKER,
    title: '조회날짜',
    open: true,
    options: [],
    selectedItems: []
  },
  {
    type: FilterTypes.SELECT,
    title: '반입장비',
    open: true,
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
    open: true,
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
    open: true,
    options: [
      { label: '해당없음', value: false },
      { label: '해당있음', value: true }
    ],
    selectedItems: []
  }
]
