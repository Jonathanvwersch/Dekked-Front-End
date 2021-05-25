import React, { ReactNode } from "react";
import { ButtonDanger, ButtonPrimary, ButtonSecondary } from "./Button.styles";
import { ComponentLoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { BUTTON_THEME, BUTTON_TYPES, SIZES } from "../../../shared";
import styled from "styled-components";

const ButtonStyles = {
  primary: ButtonPrimary,
  secondary: ButtonSecondary,
  danger: ButtonDanger,
};

interface ButtonProps {
  children: ReactNode;
  type?: BUTTON_TYPES;
  className?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  buttonStyle?: BUTTON_THEME;
  handleClick?: (args: any) => any;
  size?: SIZES;
  width?: SIZES | string;
  borderRadius?: string;
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = BUTTON_TYPES.BUTTON,
  isLoading = false,
  handleClick,
  children,
  disabled = false,
  buttonStyle = BUTTON_THEME.PRIMARY,
  fullWidth = false,
  size = SIZES.SMALL,
  width,
  borderRadius,
  ariaLabel,
}) => {
  const Button = ButtonStyles[buttonStyle];
  const className = fullWidth ? "fullWidth" : "";

  return (
    <Button
      type={type}
      disabled={disabled || isLoading}
      isLoading={isLoading}
      onClick={handleClick}
      size={size}
      className={className}
      width={width}
      borderRadius={borderRadius}
      aria-label={ariaLabel}
    >
      {isLoading ? (
        <span>
          <StyledSpan>{children}</StyledSpan>
          <ComponentLoadingSpinner />
        </span>
      ) : (
        children
      )}
    </Button>
  );
};

const StyledSpan = styled.span`
  visibility: hidden;
`;

export default Button;
