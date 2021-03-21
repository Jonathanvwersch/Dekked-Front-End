import styled from "styled-components";
import { SIZES } from "../components/common/Pages/InsetPage";
import Icon from "./Icon";
import { IconProps } from "./types";

export const Svg = styled(Icon)<IconProps>`
  transform: ${({ rotate }) => rotate};
  width: ${({ theme, size }) =>
    !size
      ? theme.sizes.icons[SIZES.SMALL]
      : size === SIZES.MEDIUM || size === SIZES.LARGE
      ? theme.sizes.icons[size]
      : size};
  height: ${({ theme, size }) =>
    !size
      ? theme.sizes.icons[SIZES.SMALL]
      : size === SIZES.MEDIUM || size === SIZES.LARGE
      ? theme.sizes.icons[size]
      : size};
`;

export const SvgVaried = styled(Icon)<IconProps>`
  transform: ${({ rotate }) => rotate};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;
