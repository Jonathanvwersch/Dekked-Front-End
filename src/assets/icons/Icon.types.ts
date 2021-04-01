import { SIZES } from "../../shared";

export enum ROTATE {
  NINETY = "rotate(90deg)",
  ONEEIGHTY = "rotate(180deg)",
  TWOSEVENTY = "rotate(270deg)",
  ZERO = "rotate(0deg)",
}

export interface IconProps {
  color?: string;
  size?: SIZES | string;
  rotate?: ROTATE;
  height?: string;
  width?: string;
}
