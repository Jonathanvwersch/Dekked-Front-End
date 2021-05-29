import React from "react";
import styled from "styled-components";

interface TextProps {
  fontSize?: string;
  fontWeight?: string;
  fontColor?: string;
  margin?: string;
  className?: string;
  maxWidth?: string;
  hover?: string;
  filterHover?: boolean; // set to true if you want to apply a filter based hover state
  filterActive?: boolean; // set to true if you want to apply a filter based active state
  textDecoration?: string;
  placeholder?: string;
  textAlign?: string;
  userSelect?: string;
}

const Text: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <StyledText
      placeholder={props.placeholder}
      spellCheck={false}
      className={props.className}
      {...props}
    >
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
  text-align: ${({ textAlign }) => textAlign};
  user-select: ${({ userSelect }) => userSelect};

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

  &:empty:before {
    content: attr(placeholder);
  }
`;

export default Text;
