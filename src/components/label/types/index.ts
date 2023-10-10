type LabelSize = 'small' | 'middle' | 'large'
type LabelShape = 'squared' | 'round' | 'pill'
type LabelTheme =
  | 'primary'
  | 'primary-outline'
  | 'default'
  | 'default-outline'
  | 'orange'
  | 'orange-outline'
  | 'red'
  | 'red-outline'

export interface LabelProps {
  text: string
  size?: LabelSize
  shape?: LabelShape
  theme?: LabelTheme
}
