import { ref } from 'vue'
import { FilterTypeEnum, type Filter } from './types'
export const dataSource = ref([
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

export const columns = ref([
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
    name: '조회날짜',
    show: true
  },
  {
    type: FilterTypeEnum.SELECT,
    name: '반입장비',
    show: false
  },
  {
    type: FilterTypeEnum.CHECKBOX,
    name: '작업유형',
    show: true
  },
  {
    type: FilterTypeEnum.RADIO,
    name: '상태',
    show: true
  }
]
