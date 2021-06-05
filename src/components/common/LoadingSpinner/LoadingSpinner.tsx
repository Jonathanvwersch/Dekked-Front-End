import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import styled, { keyframes, ThemeContext } from "styled-components";
import { IconWrapper, Spacer } from "..";
import { LogoIcon } from "../../../assets";
import { SIZES } from "../../../shared";
import { ThemeType } from "../../../styles/theme";

interface LoadingSpinnerProps {
  size?: SIZES;
  className?: string;
  text?: string;
}

// Use whenever you want to add a loading spinner in place of a component
export const ComponentLoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = SIZES.LARGE,
  className,
  text,
}) => {
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <StyledComponentSpinner className={className}>
      <IconWrapper>
        <SpinningLogo color={theme.colors.primary} size={size} />
        <Spacer width={theme.spacers.size8} />
        {text ? <FormattedMessage id={text} /> : null}
      </IconWrapper>
    </StyledComponentSpinner>
  );
};

// Use whenever you want to add a full page loading spinner e.g. on initial page load
export const FullPageLoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = SIZES.LARGE,
  className,
  text,
}) => {
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <StyledFullPageSpinner className={className}>
      <IconWrapper>
        <SpinningLogo color={theme.colors.primary} size={size} />
        <Spacer width={theme.spacers.size8} />
        {text ? <FormattedMessage id={text} /> : null}
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

const SpinningLogo = styled(LogoIcon)`
  animation: ${rotate} 500ms linear infinite;
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
  align-items: center;
`;

const StyledComponentSpinner = styled.div`
  flex-grow: 1;
  height: 100%;
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;
