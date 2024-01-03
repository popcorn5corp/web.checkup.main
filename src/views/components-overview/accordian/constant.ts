import type { FilterFormItem } from '@/components/filter-form'

export const filters: FilterFormItem[] = [
  {
    title: '게시물 구분',
    key: ['searchSample'],
    order: 1,
    type: 'Select',
    options: [
      {
        label: '공개',
        value: 'PUBLIC'
      },
      {
        label: '비공개',
        value: 'PRIVATE'
      }
    ],
    index: 0,
    open: true,
    selectedItems: [],
    removeAll: false
  },
  {
    title: '조회기간',
    key: ['searchStartDate', 'searchEndDate'],
    order: 2,
    type: 'RangeDatePicker',
    index: 1,
    open: true,
    options: [],
    selectedItems: [],
    removeAll: true
  },
  {
    title: '권한',
    key: ['searchPermission'],
    order: 3,
    type: 'Checkbox',
    options: [
      {
        label: '관리자',
        value: 'ADMIN'
      },
      {
        label: '일반',
        value: 'NORMAL'
      },
      {
        label: '게스트',
        value: 'GUEST'
      }
    ],
    index: 2,
    open: true,
    selectedItems: [],
    removeAll: false
  }
]
