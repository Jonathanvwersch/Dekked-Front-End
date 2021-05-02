import React, { useContext } from "react";
import { IconActive, Spacer } from "../../common";
import {
  CenterAlignIcon,
  LeftAlignIcon,
  RightAlignIcon,
} from "../../../assets";
import { EditorContext } from "../../../contexts/EditorContext";
import { ThemeContext } from "styled-components/macro";
import { SIZES } from "../../../shared";
import { TextAlignmentsContext } from "../../../contexts";

interface ChangeTextStyleProps {}

const ChangeTextStyles: React.FC<ChangeTextStyleProps> = () => {
  const theme = useContext(ThemeContext);

  const { currentBlock } = useContext(EditorContext);
  const { changeTextAlignment } = useContext(TextAlignmentsContext);

  return (
    <>
      <IconActive
        handleMouseDown={() => {
          changeTextAlignment("left", currentBlock);
        }}
      >
        <LeftAlignIcon size={SIZES.MEDIUM} />
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={() => {
          changeTextAlignment("center", currentBlock);
        }}
      >
        <CenterAlignIcon size={SIZES.MEDIUM} />
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={() => {
          changeTextAlignment("right", currentBlock);
        }}
      >
        <RightAlignIcon size={SIZES.MEDIUM} />
      </IconActive>
    </>
  );
};

export default ChangeTextStyles;
