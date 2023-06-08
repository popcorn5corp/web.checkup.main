
type ButtonSize = "small" | "medium" | "large";
type ButtonType = "primary" | "dashed" | "text" | "link";
type ButtonShape = "default" | "circle" | "round";
type ButtonIcon = "download" | "plusCircle" | "excel";

export interface ButtonProps {
  label: string;
  size?: ButtonSize;
  type?: ButtonType;
  shape?: ButtonShape;
  icon?: ButtonIcon;
  loading?: boolean;
  disabled?: boolean;
}
