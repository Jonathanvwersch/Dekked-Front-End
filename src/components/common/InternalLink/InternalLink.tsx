import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface InternalLinkProps {
  to: string;
  fontSize?: string;
  fontWeight?: string;
  fontColor?: string;
  margin?: string;
  className?: string;
  maxWidth?: string;
  hover?: string;
  filterActive?: boolean; // set to true if you want to apply a filter based active state
  textDecoration?: string;
  textAlign?: string;
  userSelect?: string;
  hreflang?: string;
  target?: string;
  rel?: string;
  referrerpolicy?: string;
  type?: string;
  ping?: string;
  style?: React.CSSProperties;
}

const InternalLink: React.FC<InternalLinkProps> = ({ children, ...props }) => {
  return (
    <StyledLink
      {...props}
      className={props.className}
      referrerpolicy={
        props.target === "_blank" ? "noopener noreferrer" : props.referrerpolicy
      }
    >
      {children}
    </StyledLink>
  );
};

const StyledLink = styled(Link)<InternalLinkProps>`
  font-size: ${({ fontSize, theme }) =>
    fontSize ? fontSize : theme.typography.fontSizes.size12};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ fontColor, theme }) =>
    fontColor ? fontColor : theme.colors.fontColor};
  margin: 0;
  max-width: ${({ maxWidth }) => maxWidth};
  text-decoration: ${({ textDecoration }) => textDecoration || "none"};
  text-align: ${({ textAlign }) => textAlign};
  user-select: ${({ userSelect }) => userSelect};
  cursor: pointer;

  &.overflow {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:active {
    filter: ${({ theme }) => theme.colors.active.filter};
  }
`;

export default InternalLink;
