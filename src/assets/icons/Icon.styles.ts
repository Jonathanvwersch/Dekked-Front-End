import styled from "styled-components";
import { IconProps } from "..";
import { SIZES } from "../../shared";
import Icon from "./Icon";

// SVG wrapper component to be used when height and width of the component are equal to one another
// If no size is provided the SVG will default to a size of small, otherwise it will equal the specified size
export const Svg = styled(Icon)<IconProps>`
  transform: ${({ rotate }) => rotate};
  width: ${({ theme, size }) =>
    !size
      ? theme.sizes.icons[SIZES.SMALL]
      : size === SIZES.XLARGE ||
        size === SIZES.MEDIUM ||
        size === SIZES.LARGE ||
        size === SIZES.SMALL
      ? theme.sizes.icons[size]
      : size};
  height: ${({ theme, size }) =>
    !size
      ? theme.sizes.icons[SIZES.SMALL]
      : size === SIZES.XLARGE ||
        size === SIZES.MEDIUM ||
        size === SIZES.LARGE ||
        size === SIZES.SMALL
      ? theme.sizes.icons[size]
      : size};
`;

// SVG wrapper component to be used when height and width of the component are different to one another
export const SvgVaried = styled(Icon)<IconProps>`
  transform: ${({ rotate }) => rotate};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;
