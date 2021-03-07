import React from "react";
import styled from "styled-components";

interface DividerProps {
  width?: string;
  height?: string;
  color?: string;
}

const Divider: React.FC<DividerProps> = ({ ...props }) => {
  return <StyledDivider {...props} />;
};

const StyledDivider = styled.div<DividerProps>`
  height: ${({ height }) => (height ? height : "1px")};
  width: ${({ width }) => (width ? width : "100%")};
  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.grey3};
`;

export default Divider;
