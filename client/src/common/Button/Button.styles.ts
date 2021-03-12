import styled from "styled-components";

export const StyledButton = styled.button<{
  isLoading: boolean;
}>`
  transition: opacity 0.1s ease-out, border-color 0.1s ease-out,
    background-color 0.1s ease-out;
  border-radius: ${({ theme }) => theme.display.borderRadiusFive};
  padding: ${({ theme }) => `${theme.spacers.size4} ${theme.spacers.size16}`};
  font-size: ${({ theme }) => theme.typography.fontSizes.size16};

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

  &:disabled {
    cursor: ${({ isLoading }: { isLoading: boolean }) =>
      isLoading ? "progress" : "not-allowed"};
    background-color: ${({ theme }) => theme.colors.grey1};
    border: 1px solid ${({ theme }) => theme.colors.grey1};
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

  & svg path {
    color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
    stroke: ${({ theme }) => theme.colors.backgrounds.pageBackground};
    fill: ${({ theme }) => theme.colors.backgrounds.pageBackground};
  }

  &:hover {
    filter: ${({ theme }) => theme.colors.hover.filter};
  }

  &:active {
    filter: ${({ theme }) => theme.colors.active.filter};
  }
`;

export const ButtonSecondary = styled<any>(StyledButton)`
  background-color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
  border-color: ${({ theme }) => theme.colors.grey1};

  & svg path {
    color: ${({ theme }) => theme.colors.iconColor};
    stroke: ${({ theme }) => theme.colors.iconColor};
    fill: ${({ theme }) => theme.colors.iconColor};
  }

  &:hover {
    filter: ${({ theme }) => theme.colors.hover.filter};
  }

  &:active {
    filter: ${({ theme }) => theme.colors.active.filter};
  }
`;

// @TODO RD-703
export const ButtonDanger = styled<any>(StyledButton)`
  background-color: ${({ theme }) => theme.colors.danger};
  border-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.backgrounds.pageBackground};

  & svg path {
    color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
    stroke: ${({ theme }) => theme.colors.backgrounds.pageBackground};
    fill: ${({ theme }) => theme.colors.backgrounds.pageBackground};
  }

  &:hover {
    filter: ${({ theme }) => theme.colors.hover.filter};
  }

  &:active {
    filter: ${({ theme }) => theme.colors.active.filter};
  }
`;
