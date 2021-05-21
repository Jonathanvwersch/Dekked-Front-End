import styled from "styled-components/macro";
import { SIZES } from "../../../shared";

interface ButtonProps {
  isLoading: boolean;
  size: SIZES;
  width: string;
  borderRadius?: string;
}

export const StyledButton = styled.button<ButtonProps>`
  transition: opacity 0.1s ease-out, border-color 0.1s ease-out,
    background-color 0.1s ease-out;
  border-radius: ${({ theme, borderRadius }) =>
    borderRadius ? borderRadius : theme.sizes.borderRadius[SIZES.MEDIUM]};
  padding: ${({ theme }) => `${theme.spacers.size4} ${theme.spacers.size16}`};
  font-size: ${({ theme, size }) =>
    size === SIZES.SMALL
      ? theme.typography.fontSizes.size14
      : theme.typography.fontSizes.size16};
  height: ${({ theme, size }) => theme.sizes.button[size]};
  width: ${({ width }) => width};
  border-width: 1px;
  cursor: pointer;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &.fullWidth {
    width: 100%;
  }

  &:focus,
  &:hover {
    filter: ${({ theme }) => theme.colors.hover.filter};
  }

  &:active {
    filter: ${({ theme }) => theme.colors.active.filter};
  }

  &:disabled {
    & svg path {
      stroke: ${({ theme }) => theme.colors.backgrounds.pageBackground};
    }
    cursor: ${({ isLoading }: { isLoading: boolean }) =>
      isLoading ? "progress" : "not-allowed"};
    background-color: ${({ theme }) => theme.colors.grey2};
    border: 1px solid ${({ theme }) => theme.colors.grey2};
    color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
    &:active,
    &:hover {
      filter: none;
    }
  }
`;

export const ButtonPrimary = styled<any>(StyledButton)`
  color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const ButtonSecondary = styled<any>(StyledButton)`
  background-color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
  border-color: ${({ theme }) => theme.colors.grey1};
`;

export const ButtonDanger = styled<any>(StyledButton)`
  background-color: ${({ theme }) => theme.colors.danger};
  border-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
`;
