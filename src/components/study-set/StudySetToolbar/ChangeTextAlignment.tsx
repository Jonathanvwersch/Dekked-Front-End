import React, { useContext } from "react";
import { IconActive, Spacer, Tooltip } from "../../common";
import {
  CenterAlignIcon,
  LeftAlignIcon,
  RightAlignIcon,
} from "../../../assets";
import { ThemeContext } from "styled-components/macro";
import { SIZES } from "../../../shared";
import {
  getCurrentBlock,
  updateDataOfBlock,
} from "../../notetaking/Editor/Editor.helpers";
import { EditorState } from "draft-js";

interface ChangeTextStyleProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  isDisabled?: boolean;
  iconSize?: SIZES;
}

const ChangeTextStyles: React.FC<ChangeTextStyleProps> = ({
  editorState,
  setEditorState,
  isDisabled,
  iconSize = SIZES.MEDIUM,
}) => {
  const theme = useContext(ThemeContext);
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
        isDisabled={isDisabled}
      >
        <Tooltip id="LeftAlign" text="tooltips.studySet.toolbar.leftAlign">
          <LeftAlignIcon size={iconSize} />
        </Tooltip>
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          updateData("center");
        }}
        isDisabled={isDisabled}
      >
        <Tooltip id="CenterAlign" text="tooltips.studySet.toolbar.centerAlign">
          <CenterAlignIcon size={iconSize} />
        </Tooltip>
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          updateData("right");
        }}
        isDisabled={isDisabled}
      >
        <Tooltip id="RightAlign" text="tooltips.studySet.toolbar.rightAlign">
          <RightAlignIcon size={iconSize} />
        </Tooltip>
      </IconActive>
    </>
  );
};

export default ChangeTextStyles;
