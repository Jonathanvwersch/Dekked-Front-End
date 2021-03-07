export enum ROTATE {
  NINETY = "rotate(90deg)",
  ONEEIGHTY = "rotate(180deg)",
  TWOSEVENTY = "rotate(270deg)",
  ZERO = "rotate(0deg)",
}

export interface IconProps {
  color?: string;
  size?: string;
  rotate?: ROTATE;
}
