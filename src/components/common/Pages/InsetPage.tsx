import React from "react";
import styled from "styled-components";
import { SIZES } from "../../../shared";

interface InsetPageProps {
  size?: SIZES;
  overflow?: string;
  className?: string;
}

const InsetPage: React.FC<InsetPageProps> = ({
  children,
  overflow,
  className,
  size = SIZES.SMALL,
}) => {
  return (
    <StyledInsetPage className={className} overflow={overflow} size={size}>
      {children}
    </StyledInsetPage>
  );
};

const StyledInsetPage = styled.div<InsetPageProps>`
  padding-left: 100px;
  padding-right: 100px;
  width: 100%;
  flex-grow: 1;
  overflow: ${({ overflow }) => overflow};
  max-width: ${({ theme, size }) =>
    size ? theme.sizes.wrappers[size] : theme.sizes.wrappers[SIZES.SMALL]};
  padding-top: ${({ theme }) => theme.spacers.size32};
  padding-bottom: ${({ theme, size }) =>
    size === SIZES.LARGE ? theme.spacers.size32 : theme.spacers.size128};
`;

export default InsetPage;
