import styled from "styled-components";
import { SIZES } from "../../../shared";

interface InputProps {
  height: SIZES;
  error: boolean | undefined;
  width?: string;
}

export const StyledInput = styled.input`
  transition: all 0.1s ease-in-out;
  font-size: ${({ theme }) => theme.typography.fontSizes.size14};
  min-width: 0;
  width: 100%;
  background: none;
  border: none;
  height: 100%;
  color: ${({ theme }) => theme.colors.fontColor};
  padding: 0 ${({ theme }) => theme.spacers.size8};
  border-radius: ${({ theme }) => theme.sizes.borderRadius[SIZES.MEDIUM]};

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.grey2};
  }

  /* For IE this declaration needs to be separate */
  ::-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.grey2};
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px yellow inset;
  }
`;

export const InputWrapper = styled.div<InputProps>`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  cursor: text;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  border-radius: ${({ theme }) => theme.sizes.borderRadius[SIZES.MEDIUM]};
  background-color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
  height: ${({ theme, height }) => theme.sizes.input[height]};
  border: ${({ theme, error }) => error && `1px solid ${theme.colors.danger}`};

  &:focus-within {
    border: 1px solid
      ${({ theme, error }) =>
        error ? theme.colors.danger : theme.colors.primary};
    outline: none;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.grey2};
    color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
    cursor: not-allowed;
  }
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.grey1};
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSizes.size14};
  line-height: ${({ theme }) => theme.typography.lineHeightSmall};
  margin-bottom: ${({ theme }) => theme.spacers.size4};
`;

export const LabelAndInputWrapper = styled.div<{ width?: string }>`
  width: ${({ width }) => width || "100%"};
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const InputIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: ${({ theme }) => theme.spacers.size8};
`;
