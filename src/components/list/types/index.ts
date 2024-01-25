import type { ListProps as AListProps } from 'ant-design-vue'

export interface ListProps extends AListProps {
  /**
   * 로딩 스피너
   */
  loading?: boolean
  /**
   * 레이아웃
   */
  itemLayout?: 'horizontal' | 'vertical'
  /**
   * 리스트 데이터
   */
  dataSource: any
}

export interface ListItemProps {}

export interface ListItemMetaProps {
  description?: string
}
