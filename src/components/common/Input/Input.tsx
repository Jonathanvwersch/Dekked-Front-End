import React, { ChangeEvent, FocusEvent } from "react";
import { Flex } from "..";
import { SIZES } from "../../../shared";
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
  size = SIZES.SMALL,
}) => {
  return (
    <LabelAndInputWrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Flex width="100%">
        <StyledInput
          height={size}
          type={type}
          value={value === null ? undefined : value}
          name={name}
          disabled={disabled}
          autoComplete="off"
          onBlur={onBlur}
          onChange={onChange}
          aria-label={ariaLabel}
          placeholder={placeholder}
          id={id}
        />
      </Flex>
    </LabelAndInputWrapper>
  );
};

export default Input;
