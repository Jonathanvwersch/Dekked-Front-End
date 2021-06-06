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
  height?: string;
  width?: string;
}

// Use whenever you want to add a loading spinner in place of a component
export const ComponentLoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = SIZES.LARGE,
  className,
  text,
  height,
  width,
}) => {
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <StyledComponentSpinner height={height} width={width} className={className}>
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
  background-color:${({ theme }) => theme.colors.backgrounds.pageBackground}
  justify-content: center;
  align-items: center;
`;

const StyledComponentSpinner = styled.div<{ height?: string; width?: string }>`
  flex-grow: 1;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;
