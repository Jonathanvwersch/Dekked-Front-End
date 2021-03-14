import styled from "styled-components";
import { commonStyles, headingStyles } from "./Headers.styles";

export type HeadingProps = {
  fontColor?: string;
  ref?: any;
};

export const H1 = styled.h1<HeadingProps>`
  ${commonStyles}
  ${() => {
    return headingStyles.h1;
  }}
`;

export const H2 = styled.h2<HeadingProps>`
  ${commonStyles}
  ${() => {
    return headingStyles.h2;
  }}
`;

export const H3 = styled.h3<HeadingProps>`
  ${commonStyles}
  ${() => {
    return headingStyles.h3;
  }}
`;

export const H4 = styled.h4<HeadingProps>`
  ${commonStyles}
  ${() => {
    return headingStyles.h4;
  }}
`;

export const H5 = styled.h5<HeadingProps>`
  ${commonStyles}
  ${() => {
    return headingStyles.h5;
  }}
`;

export const H6 = styled.h6<HeadingProps>`
  ${commonStyles}
  ${() => {
    return headingStyles.h6;
  }}
`;
