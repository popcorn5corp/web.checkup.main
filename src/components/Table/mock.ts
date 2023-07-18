import { ref } from 'vue'
import { FilterTypeEnum, type Filter } from './types'
export const dataSource = ref<any>([
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street'
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
  }
])

export const columns = ref<any>([
  {
    title: 'No',
    dataIndex: 'key',
    key: 'key'
  },
  {
    title: '신청서 번호',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '작업 유형',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '작업',
    dataIndex: 'address',
    key: 'address'
  }
])

export const filterList: Filter[] = [
  {
    type: FilterTypeEnum.DATEPICKER,
    title: '조회날짜',
    open: true,
    options: [],
    selected: []
  },
  {
    type: FilterTypeEnum.SELECT,
    title: '반입장비',
    open: false,
    options: [
      { label: '고소작업', value: 1 },
      { label: '화기작업', value: 2 },
      { label: '밀폐작업', value: 3 },
      { label: '화기작업', value: 4 }
    ],
    selected: []
  },
  {
    type: FilterTypeEnum.CHECKBOX,
    title: '작업유형',
    open: true,
    options: [
      { label: '일반공사', value: 1 },
      { label: '전기공사', value: 2 },
      { label: '기계공사', value: 3 },
      { label: '소방공사', value: 4 }
    ],
    selected: []
  },
  {
    type: FilterTypeEnum.RADIO,
    title: '상태',
    open: true,
    options: [
      { label: '해당있음', value: true },
      { label: '해당없음', value: false }
    ],
    selected: []
  }
]
