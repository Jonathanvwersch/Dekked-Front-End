export enum ROTATE {
  NINETY = "rotate(90deg)",
  ONEEIGHTY = "rotate(180deg)",
  TWOSEVENTY = "rotate(270deg)",
  ZERO = "rotate(0deg)",
}

export interface IconProps {
  className?: string;
  colour?: string;
  size?: string;
  rotate?: ROTATE | null;
}
