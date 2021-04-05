import styled from "styled-components/macro";
import { SIZES } from "../../../shared";

interface InputProps {
  height: SIZES;
}

export const StyledInput = styled.input<InputProps>`
  background-color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
  border-radius: ${({ theme }) => theme.sizes.borderRadius[SIZES.MEDIUM]};
  padding: 10px 6px;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  transition: all 0.1s ease-in-out;
  font-size: ${({ theme }) => theme.typography.fontSizes.size14};
  width: 100%;
  min-width: 0;
  height: ${({ theme, height }) => theme.sizes.input[height]};

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.grey2};
  }

  /* For IE this declaration needs to be separate */
  ::-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.grey2};
  }

  &:focus,
  &:active:not(:disabled):not(.error) {
    border: 2px solid ${({ theme }) => theme.colors.primary};
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

export const LabelAndInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
