import type { MenuTheme } from 'ant-design-vue'

export interface HeaderProps {
  collapsed?: boolean
  theme?: MenuTheme
}

export const rollingList = [
  {
    title: '[공지사항] 체크업서비스 사용법 안내',
    isNew: false
  },
  {
    title: '[공지사항] 체크업서비스 EMS 신규메뉴가 추가되었습니다.',
    isNew: true
  },
  {
    title: '[공지사항] 업무 모듈을 추가하여 업무 템플릿을 효율적으로 관리해보세요.',
    isNew: true
  },
  {
    title: '[공지사항] 서비스 업그레이드를 통해 더 많은 기능을 이용해보세요.',
    isNew: true
  }
]
