import React from "react";
import styled from "styled-components";

interface TextProps {
  fontSize?: string;
  fontWeight?: string;
  fontColor?: string;
  fontFamily?: string;
  margin?: string;
  overflowText?: boolean;
  className?: string;
  editableText?: boolean;
  maxWidth?: string;
  hover?: string;
}

const Text: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <StyledText
      contentEditable={props.editableText}
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
  &.overflow {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &:hover {
    color: ${({ hover }) => hover};
  }
`;

export default Text;
