import React, { useContext } from "react";
import { IconActive, Spacer } from "../../common";
import {
  CenterAlignIcon,
  LeftAlignIcon,
  RightAlignIcon,
} from "../../../assets";
import { ThemeContext } from "styled-components/macro";
import { SIZES, TEXT_STYLES } from "../../../shared";
import { EditorContext } from "../../../contexts";

interface ChangeTextStyleProps {}

const ChangeTextStyles: React.FC<ChangeTextStyleProps> = () => {
  const theme = useContext(ThemeContext);
  const { toggleBlockStyle } = useContext(EditorContext);

  return (
    <>
      <IconActive
        handleMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          toggleBlockStyle(TEXT_STYLES.ALIGN_LEFT, [
            TEXT_STYLES.ALIGN_CENTER,
            TEXT_STYLES.ALIGN_RIGHT,
            TEXT_STYLES.ALIGN_LEFT,
          ]);
        }}
      >
        <LeftAlignIcon size={SIZES.MEDIUM} />
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          toggleBlockStyle(TEXT_STYLES.ALIGN_CENTER, [
            TEXT_STYLES.ALIGN_CENTER,
            TEXT_STYLES.ALIGN_LEFT,
            TEXT_STYLES.ALIGN_CENTER,
          ]);
        }}
      >
        <CenterAlignIcon size={SIZES.MEDIUM} />
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          toggleBlockStyle(TEXT_STYLES.ALIGN_RIGHT, [
            TEXT_STYLES.ALIGN_LEFT,
            TEXT_STYLES.ALIGN_CENTER,
            TEXT_STYLES.ALIGN_RIGHT,
          ]);
        }}
      >
        <RightAlignIcon size={SIZES.MEDIUM} />
      </IconActive>
    </>
  );
};

export default ChangeTextStyles;
