import styled from "styled-components/macro";
import { ThemeType } from "../../../styles/theme";
import { commonStyles, headingStyles } from "./Headers.styles";

type HeadingTagName = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeadingProps = {
  fontColor?: string;
  styledAs?: HeadingTagName;
  textAlign?: string;
  fontWeight?: keyof ThemeType["typography"]["fontWeights"];
};

export const H1 = styled.h1<HeadingProps>`
  ${commonStyles}
  ${({ styledAs }) => {
    if (styledAs) {
      return headingStyles[styledAs];
    }
    return headingStyles.h1;
  }}
`;

export const H2 = styled.h2<HeadingProps>`
  ${commonStyles}
  ${({ styledAs }) => {
    if (styledAs) {
      return headingStyles[styledAs];
    }
    return headingStyles.h2;
  }}
`;

export const H3 = styled.h3<HeadingProps>`
  ${commonStyles}
  ${({ styledAs }) => {
    if (styledAs) {
      return headingStyles[styledAs];
    }
    return headingStyles.h3;
  }}
`;

export const H4 = styled.h4<HeadingProps>`
  ${commonStyles}
  ${({ styledAs }) => {
    if (styledAs) {
      return headingStyles[styledAs];
    }
    return headingStyles.h4;
  }}
`;

export const H5 = styled.h5<HeadingProps>`
  ${commonStyles}
  ${({ styledAs }) => {
    if (styledAs) {
      return headingStyles[styledAs];
    }
    return headingStyles.h5;
  }}
`;

export const H6 = styled.h6<HeadingProps>`
  ${commonStyles}
  ${({ styledAs }) => {
    if (styledAs) {
      return headingStyles[styledAs];
    }
    return headingStyles.h6;
  }}
`;
