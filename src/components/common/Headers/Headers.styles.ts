import { css } from "styled-components";
import { HeadingProps } from "./Headers";

export const commonStyles = css<HeadingProps>`
  margin: 0;
  color: ${({ theme, fontColor }) =>
    fontColor ? fontColor : theme.colors.fontColor};
  text-align: ${({ textAlign }) => textAlign};
  font-weight: ${({ fontWeight, theme }) =>
    fontWeight && theme.typography.fontWeights[fontWeight]};
`;

export const headingStyles = {
  h1: css`
    font-size: ${({ theme }) => theme.typography.fontSizes.size48};
    line-height: ${({ theme }) => theme.typography.lineHeightSmall};
  `,
  h2: css`
    font-size: ${({ theme }) => theme.typography.fontSizes.size42};
    line-height: ${({ theme }) => theme.typography.lineHeightSmall};
  `,
  h3: css`
    font-size: ${({ theme }) => theme.typography.fontSizes.size32};
    line-height: ${({ theme }) => theme.typography.lineHeightSmall};
  `,
  h4: css`
    font-size: ${({ theme }) => theme.typography.fontSizes.size26};
    line-height: ${({ theme }) => theme.typography.lineHeightSmall};
  `,
  h5: css`
    font-size: ${({ theme }) => theme.typography.fontSizes.size20};
    line-height: ${({ theme }) => theme.typography.lineHeightSmall};
  `,
  h6: css`
    font-size: ${({ theme }) => theme.typography.fontSizes.size16};
    line-height: ${({ theme }) => theme.typography.lineHeightSmall};
  `,
};
