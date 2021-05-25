// Basic spacer component; use in place of margins
import React from "react";
import styled from "styled-components";

interface SpacerProps {
  width?: string;
  height?: string;
  grow?: string;
  shrink?: string;
}

const Spacer: React.FC<SpacerProps> = ({ ...props }) => {
  return <StyledSpacer {...props}></StyledSpacer>;
};

const StyledSpacer = styled.div<SpacerProps>`
  min-width: ${({ width }) => (width ? width : "1px")};
  min-height: ${({ height }) => (height ? height : "1px")};
  flex-grow: ${({ grow }) => (grow ? grow : "0")};
  flex-shrink: ${({ shrink }) => (shrink ? shrink : "0")};
`;

export default React.memo(Spacer);
