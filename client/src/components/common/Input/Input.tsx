import React, { ChangeEvent, FocusEvent } from "react";
import { HFlex } from "..";
import { SIZES } from "../Pages/InsetPage";
import { Label, LabelAndInputWrapper, StyledInput } from "./Input.styles";

export interface InputProps {
  id?: string;
  label?: string;
  type?: string;
  value?: string | number | null;
  name?: string;
  disabled?: boolean;
  ariaLabel?: string;
  placeholder?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  isMissing?: boolean;
  isIncomplete?: boolean;
  clearOnFocus?: boolean;
  size?: SIZES;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  value,
  name,
  disabled,
  ariaLabel,
  placeholder,
  onBlur,
  onChange,
  onFocus,
  clearOnFocus = false,
  size = SIZES.SMALL,
}) => {
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    // For input fields that contain sensitive data, like encrypted passwords
    // we want to clear the input on focus rather than letting users edit it
    if (clearOnFocus) {
      e.target.value = "";
      e.currentTarget.value = "";
      onChange && onChange(e);
    }
    onFocus && onFocus(e);
  };

  return (
    <LabelAndInputWrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <HFlex width="100%">
        <StyledInput
          height={size}
          type={type}
          value={value === null ? undefined : value}
          name={name}
          disabled={disabled}
          autoComplete="off"
          onBlur={onBlur}
          onChange={onChange}
          onFocus={handleFocus}
          aria-label={ariaLabel}
          placeholder={placeholder}
          id={id}
        />
      </HFlex>
    </LabelAndInputWrapper>
  );
};

export default Input;
