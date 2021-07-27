// Component to apply margin and padding around another element

import React from "react";
import styled, { css } from "styled-components";

export interface BoxProps {
  mt?: string; // margin top (e.g. '10px')
  mr?: string; // margin right (e.g. '10px')
  mb?: string; // margin bottom (e.g. '10px')
  ml?: string; // margin left (e.g. '10px')
  mx?: string; // margin left, margin right (e.g. '10px 11px' or '10px' if you want the same value for left and right)
  my?: string; // margin top, margin bottom (e.g. '10px 11px' or '10px' if you want the same value for top and bottom)
  m?: string; // margin top, margin right, margin bottom, margin left (e.g. '10px 11px 12px 13px' or '10px' (same margin on all 4 sides) or '10px 11px' (first number refers to top and bottom margin and second number refers to left and right margin))
  pt?: string; // padding top (e.g. '10px')
  pr?: string; // padding right (e.g. '10px')
  pb?: string; // padding bottom (e.g. '10px')
  pl?: string; // padding left (e.g. '10px')
  px?: string; // padding left, padding right (e.g. '10px 11px' or '10px' if you want the same value for left and right)
  py?: string; // padding top, padding bottom (e.g. '10px 11px' or '10px' if you want the same value for left and right
  p?: string; // padding top, padding right, padding bottom, padding left (e.g. '10px 11px 12px 13px' or '10px' (same padding on all 4 sides) or '10px 11px' (first number refers to top and bottom padding and second number refers to left and right padding))
  width?: string;
  height?: string;
  style?: React.CSSProperties | undefined;
}

const getXAndYValues = (value: string, afterSpace?: boolean) => {
  if (value.indexOf(" ") === -1) return value;

  var splitValue = value.split(" ");
  return afterSpace ? splitValue[1] : splitValue[0];
};

const Box: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <StyledBox style={props.style} {...props}>
      {children}
    </StyledBox>
  );
};

export const marginAndPadding = css<BoxProps>`
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  margin-left: ${({ mx }) => mx && getXAndYValues(mx)};
  margin-right: ${({ mx }) => mx && getXAndYValues(mx, true)};
  margin-top: ${({ my }) => my && getXAndYValues(my)};
  margin-bottom: ${({ my }) => my && getXAndYValues(my, true)};
  margin: ${({ m }) => m};

  padding-top: ${({ pt }) => pt};
  padding-right: ${({ pr }) => pr};
  padding-bottom: ${({ pb }) => pb};
  padding-left: ${({ pl }) => pl};
  padding-left: ${({ px }) => px && getXAndYValues(px)};
  padding-right: ${({ px }) => px && getXAndYValues(px, true)};
  padding-top: ${({ py }) => py && getXAndYValues(py)};
  padding-bottom: ${({ py }) => py && getXAndYValues(py, true)};
  padding: ${({ p }) => p};
`;

const StyledBox = styled.div<BoxProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  ${() => marginAndPadding}
`;

export default Box;
