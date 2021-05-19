import React from "react";
import styled from "styled-components/macro";
import { SIZES } from "../../../shared";

interface InsetPageProps {
  size?: SIZES;
}

const InsetPage: React.FC<InsetPageProps> = ({
  children,
  size = SIZES.SMALL,
}) => {
  return <StyledInsetPage size={size}>{children}</StyledInsetPage>;
};

const StyledInsetPage = styled.div<InsetPageProps>`
  padding-left: 100px;
  padding-right: 100px;
  width: 100%;
  flex-grow: 1;
  max-width: ${({ theme, size }) =>
    size ? theme.sizes.wrappers[size] : theme.sizes.wrappers[SIZES.SMALL]};
  padding-top: ${({ theme, size }) =>
    size === SIZES.LARGE ? theme.spacers.size32 : theme.spacers.size32};
  padding-bottom: ${({ theme, size }) =>
    size === SIZES.LARGE ? theme.spacers.size64 : theme.spacers.size128};
`;

export default InsetPage;
