import styled from "styled-components";
import { SIZES } from "../../../shared";

interface ButtonProps {
  isLoading: boolean;
  size: SIZES;
  width: SIZES | string;
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
  height: ${({ theme, size }) => theme.sizes.button.height[size]};
  width: ${({ theme, width }) =>
    width === SIZES.SMALL ||
    width === SIZES.MEDIUM ||
    width === SIZES.LARGE ||
    width === SIZES.LARGE
      ? theme.sizes.button.width[width]
      : width};
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: none;
  border: none;

  &.fullWidth {
    width: 100%;
  }

  &:focus,
  &:hover {
    filter: ${({ theme }) => theme.colors.hover.filter};
  }

  &:active {
    transform: scale(0.9);
  }

  &:disabled {
    & svg path {
      stroke: ${({ theme }) => theme.colors.backgrounds.pageBackground};
    }
    cursor: ${({ isLoading }: { isLoading: boolean }) =>
      isLoading ? "progress" : "not-allowed"};
    background-color: ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
    &:active,
    &:hover {
      filter: none;
    }
  }
`;

export const ButtonPrimary = styled<any>(StyledButton)`
  color: white;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const ButtonSecondary = styled<any>(StyledButton)`
  background-color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
  color: ${({ theme }) => theme.colors.fontColor};
  border-color: ${({ theme }) => theme.colors.grey1};
  border-width: 1px;
  border-style: solid;
`;

export const ButtonDanger = styled<any>(StyledButton)`
  background-color: ${({ theme }) => theme.colors.danger};
  color: white;
`;
