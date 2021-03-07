// Wrapper component for making an icon into a button with a hover and active state
import React from "react";
import styled from "styled-components";

interface IconActiveProps {
  className?: string;
  handleClick?: Function;
}

const IconActive: React.FC<IconActiveProps> = ({
  children,
  handleClick,
  ...props
}) => {
  return (
    <StyledIconActive
      aria-label="icon"
      onClick={(event: any) => {
        handleClick && handleClick(event);
      }}
      className={props.className}
    >
      {children}
    </StyledIconActive>
  );
};

const StyledIconActive = styled.button<IconActiveProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
  &:hover {
    & svg {
      & path {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
  }

  &:active {
    & svg {
      & path {
        filter: ${({ theme }) => theme.colors.hover.filter};
      }
    }
  }
`;

export default IconActive;
