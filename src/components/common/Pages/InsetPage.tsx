import React from "react";
import styled from "styled-components";
import { SIZES } from "../../../shared";

interface InsetPageProps {
  size: SIZES;
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
  max-width: ${({ theme, size }) => theme.sizes.wrappers[size]};
  margin-top: ${({ theme }) => theme.spacers.size64};
  margin-bottom: ${({ theme }) => theme.spacers.size128};
`;

export default InsetPage;
