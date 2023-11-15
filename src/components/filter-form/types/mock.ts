import { FILTER_UI, type FilterFormItem } from '.'

export const filterList: FilterFormItem[] = [
  {
    index: 0,
    type: FILTER_UI.DATE_PICKER,
    title: '날짜선택',
    key: '',
    open: true,
    options: [],
    selectedItems: []
  },
  {
    index: 1,
    type: FILTER_UI.RANGE_DATE_PICKER,
    title: '조회기간',
    key: '',
    open: true,
    options: [],
    selectedItems: []
  },
  {
    index: 2,
    type: FILTER_UI.SELECT,
    title: '반입장비',
    key: '',
    open: true,
    options: [
      { label: '고소작업', value: 1 },
      { label: '화기작업', value: 2 },
      { label: '밀폐작업', value: 3 },
      { label: '화기작업', value: 4 }
    ],
    selectedItems: []
  },
  // {
  //   type: FILTER_UI.CHECKBOX,
  //   title: '작업유형2',
  //   open: true,
  //   options: [
  //     { label: '일반공사', value: 1 },
  //     { label: '전기공사', value: 2 },
  //     { label: '기계공사', value: 3 },
  //     { label: '소방공사', value: 4 }
  //   ],
  //   selectedItems: []
  // },
  {
    index: 3,
    type: FILTER_UI.CHECKBOX,
    title: '작업유형',
    key: '',
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
    index: 4,
    type: FILTER_UI.RADIO,
    title: '상태',
    key: '',
    open: true,
    options: [
      { label: '해당없음', value: false },
      { label: '해당있음', value: true }
    ],
    selectedItems: []
  }
]
