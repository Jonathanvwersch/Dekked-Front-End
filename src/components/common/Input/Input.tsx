import React, { ChangeEvent, useContext, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Flex, Spacer } from "..";
import { SIZES } from "../../../shared";
import {
  InputIconWrapper,
  InputWrapper,
  Label,
  LabelAndInputWrapper,
  StyledInput,
} from "./Input.styles";
import { Text } from "../../common";
import { ThemeContext } from "styled-components";
import { ClearIcon, EyeIcon } from "../../../assets";

export interface InputProps {
  id?: string;
  label?: string;
  type?: string;
  value?: string | number | null;
  name?: string;
  isDisabled?: boolean;
  ariaLabel?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  size?: SIZES;
  validate?: () => boolean;
  errorMessage?: string;
  required?: boolean;
  showPassword?: boolean;
  clearButton?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  value,
  name,
  isDisabled,
  ariaLabel,
  placeholder,
  onChange,
  size = SIZES.SMALL,
  validate,
  errorMessage,
  required,
  showPassword,
  clearButton = false,
}) => {
  const theme = useContext(ThemeContext);
  const [validation, setValidation] = useState<boolean>(true);

  const [inputType, setInputType] = useState<"password" | "text">("password");
  const asterisks = !required ? "" : "*";

  return (
    <LabelAndInputWrapper>
      {label && <Label htmlFor={id}>{`${label} ${asterisks}`}</Label>}
      <Flex width="100%" flexDirection="column" alignItems="flex-start">
        <InputWrapper height={size}>
          <StyledInput
            type={type === "password" ? inputType : type}
            value={value === null ? undefined : value}
            name={name}
            disabled={isDisabled}
            autoComplete="off"
            onBlur={() =>
              typeof validate !== "undefined" && setValidation(validate())
            }
            onChange={onChange}
            aria-label={ariaLabel}
            placeholder={placeholder}
            id={id}
          />
          {showPassword && (
            <InputIconWrapper
              onClick={() => {
                setInputType(inputType === "password" ? "text" : "password");
              }}
            >
              <EyeIcon color={theme.colors.grey1} />
            </InputIconWrapper>
          )}
          {clearButton && (
            <InputIconWrapper
              onClick={(e) => {
                return null;
              }}
            >
              <ClearIcon color={theme.colors.grey1} />
            </InputIconWrapper>
          )}
        </InputWrapper>
        <Spacer height={theme.spacers.size4} />
        {validate && !validation && errorMessage && (
          <Text fontColor={theme.colors.danger}>
            <FormattedMessage id={errorMessage} />
          </Text>
        )}
      </Flex>
    </LabelAndInputWrapper>
  );
};

export default Input;
