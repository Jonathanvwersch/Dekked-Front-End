import styled from "styled-components";
import Icon from "./Icon";
import { IconProps } from "./types";

export const Svg = styled(Icon)<IconProps>`
  transform: ${({ rotate }) => rotate};
  width: ${({ theme, size }) => (size ? size : theme.icons.size)};
  height: ${({ theme, size }) => (size ? size : theme.icons.size)};
`;
