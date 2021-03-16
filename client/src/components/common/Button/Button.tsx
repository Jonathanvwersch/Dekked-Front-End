import React, { ReactNode } from "react";

import { ButtonDanger, ButtonPrimary, ButtonSecondary } from "./Button.styles";
import { ComponentLoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

const ButtonStyles = {
  primary: ButtonPrimary,
  secondary: ButtonSecondary,
  danger: ButtonDanger,
};

export enum VARIANT_TYPES {
  DEFAULT = "default",
  LARGE = "large",
}

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
  variant?: VARIANT_TYPES;
}

const Button: React.FC<ButtonProps> = ({
  type = BUTTON_TYPES.BUTTON,
  isLoading = false,
  handleClick,
  children,
  disabled = false,
  buttonStyle = BUTTON_THEME.PRIMARY,
  fullWidth = false,
  variant = "default",
}) => {
  const Button = ButtonStyles[buttonStyle];
  const className = fullWidth ? "fullWidth" : "";

  return (
    <Button
      type={type}
      disabled={disabled || isLoading}
      isLoading={isLoading}
      onClick={handleClick}
      variant={variant}
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
