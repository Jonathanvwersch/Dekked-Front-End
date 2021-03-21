import React, { ReactNode } from "react";
import { ButtonDanger, ButtonPrimary, ButtonSecondary } from "./Button.styles";
import { ComponentLoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { SIZES } from "../Pages/InsetPage";

const ButtonStyles = {
  primary: ButtonPrimary,
  secondary: ButtonSecondary,
  danger: ButtonDanger,
};

export enum BUTTON_TYPES {
  SUBMIT = "submit",
  BUTTON = "button",
}

export enum BUTTON_THEME {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "danger",
}

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
    >
      {isLoading ? (
        <span>
          <ComponentLoadingSpinner />
          <span style={{ visibility: "hidden" }}>{children}</span>
        </span>
      ) : (
        children
      )}
    </Button>
  );
};

export default Button;
