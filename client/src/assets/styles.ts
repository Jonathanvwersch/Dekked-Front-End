import styled from "styled-components";
import Icon from "./Icon";
import { IconProps } from "./types";

export const Svg = styled(Icon)<IconProps>`
  transform: ${({ rotate }) => rotate};
  width: ${({ theme, size, width }) => (size ? size : theme.icons.size)};
  height: ${({ theme, size }) => (size ? size : theme.icons.size)};
`;

export const SvgVaried = styled(Icon)<IconProps>`
  transform: ${({ rotate }) => rotate};
  width: ${({ theme, width }) => width};
  height: ${({ theme, height }) => height};
`;
