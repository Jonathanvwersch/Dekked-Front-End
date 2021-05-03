import React, { useContext } from "react";
import { IconActive, Spacer, Tooltip } from "../../common";
import {
  CenterAlignIcon,
  LeftAlignIcon,
  RightAlignIcon,
} from "../../../assets";
import { ThemeContext } from "styled-components/macro";
import { SIZES } from "../../../shared";
import { EditorContext } from "../../../contexts";
import {
  getCurrentBlock,
  updateDataOfBlock,
} from "../../notetaking/Editor/Editor.helpers";

interface ChangeTextStyleProps {}

const ChangeTextStyles: React.FC<ChangeTextStyleProps> = () => {
  const theme = useContext(ThemeContext);
  const { editorState, setEditorState } = useContext(EditorContext);

  const block = getCurrentBlock(editorState);
  const data = block.getData();

  // We need to update the meta data of the block to save the checked state
  const updateData = (alignment: "left" | "right" | "center") => {
    const newData = data.set("alignment", alignment);
    setEditorState(updateDataOfBlock(editorState, block, newData));
  };

  return (
    <>
      <IconActive
        handleMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          updateData("left");
        }}
      >
        <Tooltip id="LeftAlign" text="tooltips.studySet.toolbar.leftAlign">
          <LeftAlignIcon size={SIZES.MEDIUM} />
        </Tooltip>
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          updateData("center");
        }}
      >
        <Tooltip id="CenterAlign" text="tooltips.studySet.toolbar.centerAlign">
          <CenterAlignIcon size={SIZES.MEDIUM} />
        </Tooltip>
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          updateData("right");
        }}
      >
        <Tooltip id="RightAlign" text="tooltips.studySet.toolbar.rightAlign">
          <RightAlignIcon size={SIZES.MEDIUM} />
        </Tooltip>
      </IconActive>
    </>
  );
};

export default ChangeTextStyles;
