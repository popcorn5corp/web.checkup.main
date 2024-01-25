type BadgeSize = 'small' | 'middle' | 'large'
type BadgeShape = 'squared' | 'round' | 'pill'
type BadgeTheme =
  | 'primary'
  | 'primary-outline'
  | 'default'
  | 'default-outline'
  | 'orange'
  | 'orange-outline'
  | 'red'
  | 'red-outline'

export interface BadgeProps {
  /**
   * 배지 내부 텍스트
   */
  text?: string
  /**
   * 배지 크기 조정
   */
  size?: BadgeSize
  /**
   * 배지 모양 설정
   */
  shape?: BadgeShape
  /**
   * 배지 테마 설정
   */
  theme?: BadgeTheme
}
