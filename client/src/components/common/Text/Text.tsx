import React from "react";
import styled from "styled-components";

interface TextProps {
  fontSize?: string;
  fontWeight?: string;
  fontColor?: string;
  margin?: string;
  overflowText?: boolean;
  className?: string;
  maxWidth?: string;
  hover?: string;
  filterHover?: boolean;
  filterActive?: boolean;
  textDecoration?: string;
}

const Text: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <StyledText spellCheck={false} className={props.className} {...props}>
      {children}
    </StyledText>
  );
};

const StyledText = styled.div<TextProps>`
  font-size: ${({ fontSize, theme }) =>
    fontSize ? fontSize : theme.typography.fontSizes.size12};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ fontColor, theme }) =>
    fontColor ? fontColor : theme.colors.fontColor};
  margin: 0;
  max-width: ${({ maxWidth }) => maxWidth};
  text-decoration: ${({ textDecoration }) => textDecoration};

  &.overflow {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &:hover {
    color: ${({ hover }) => hover};
    filter: ${({ filterHover, theme }) =>
      filterHover ? theme.colors.hover.filter : null};
  }

  &:active {
    filter: ${({ filterActive, theme }) =>
      filterActive ? theme.colors.active.filter : null};
  }
`;

export default Text;
