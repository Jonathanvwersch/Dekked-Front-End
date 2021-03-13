import React from "react";
import styled from "styled-components";
import { FILETREE_TYPES } from "../../contexts/FileTreeContext";

export enum SIZES {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

interface InsetPageProps {
  type?: FILETREE_TYPES;
  size?: SIZES;
  pageRef?: React.RefObject<HTMLDivElement>;
}

const InsetPage: React.FC<InsetPageProps> = ({
  children,
  size = SIZES.SMALL,
  pageRef,
}) => {
  return (
    <StyledInsetPage ref={pageRef} size={size}>
      {children}
    </StyledInsetPage>
  );
};

const StyledInsetPage = styled.div<InsetPageProps>`
  padding-left: calc(100px + env(safe-area-inset-left));
  padding-right: calc(100px + env(safe-area-inset-right));
  width: 100%;
  flex-grow: 1;
  max-width: ${({ theme, size }) => theme.wrappers[size!]};
  margin-top: 64px;
  margin-bottom: 96px;
`;

export default InsetPage;
