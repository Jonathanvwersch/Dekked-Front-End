export enum ORIENTATION {
  LEFT = "left",
  RIGHT = "right",
  UP = "up",
  DOWN = "down",
}

export interface IconProps {
  className?: string;
  colour?: string;
  size?: string;
  orientation?: ORIENTATION;
}
