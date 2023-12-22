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
  text?: string
  size?: BadgeSize
  shape?: BadgeShape
  theme?: BadgeTheme
}
