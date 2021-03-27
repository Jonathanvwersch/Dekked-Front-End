import React, { useContext } from "react";
import styled, { keyframes, ThemeContext } from "styled-components";
import { LogoIcon } from "../../../assets";
import { SIZES } from "../../../shared";
import { ThemeType } from "../../../styles/theme";

import IconWrapper from "../IconWrapper/IconWrapper";

// Use whenever you want to add a loading spinner in place of a component
export const ComponentLoadingSpinner: React.FC = () => {
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <StyledComponentSpinner>
      <IconWrapper>
        <LogoIcon color={theme.colors.primary} size={SIZES.LARGE} />
      </IconWrapper>
    </StyledComponentSpinner>
  );
};

// Use whenever you want to add a full page loading spinner e.g. on initial page load
export const FullPageLoadingSpinner: React.FC = () => {
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <StyledFullPageSpinner>
      <IconWrapper>
        <LogoIcon color={theme.colors.primary} size={SIZES.LARGE} />
      </IconWrapper>
    </StyledFullPageSpinner>
  );
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledFullPageSpinner = styled.div`
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  position: fixed;
  zindex: 10;
  display: flex;
  justify-content: center;
  alignitems: center;
  animation: ${rotate} 500ms linear infinite;
`;

const StyledComponentSpinner = styled.div`
  flex-grow: 1;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotate} 500ms linear infinite;
`;
