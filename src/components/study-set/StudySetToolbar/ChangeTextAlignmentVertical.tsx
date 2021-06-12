import React, { useContext } from "react";
import { Flex, IconActive, IconWrapper, Spacer, Tooltip } from "../../common";
import {
  CenterAlignIcon,
  DropDownArrowIcon,
  LeftAlignIcon,
  RightAlignIcon,
  ROTATE,
} from "../../../assets";
import { ThemeContext } from "styled-components";
import { SIZES } from "../../../shared";
import {
  getCurrentBlock,
  removeSpecificBlockStyle,
  updateDataOfBlock,
} from "../../notetaking/Editor/Editor.helpers";
import { EditorState } from "draft-js";

interface ChangeTextStyleProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  isDisabled?: boolean;
  iconSize?: SIZES;
  backgroundColor?: string;
}

const ChangeTextAlignmentVertical: React.FC<ChangeTextStyleProps> = ({
  editorState,
  setEditorState,
  isDisabled,
  iconSize = SIZES.MEDIUM,
  backgroundColor,
}) => {
  const theme = useContext(ThemeContext);
  const block = getCurrentBlock(editorState);
  const data = block.getData();

  // We need to update the meta data of the block to save the checked state
  const updateData = (alignment: "left" | "right" | "center") => {
    const newData = data.set("alignment", alignment);
    //
    setEditorState(
      updateDataOfBlock(
        removeSpecificBlockStyle(undefined, editorState, true),
        block,
        newData
      )
    );
  };

  return (
    <>
      <IconWrapper>
        <IconActive
          backgroundColor={
            backgroundColor || theme.colors.backgrounds.pageBackground
          }
          handleMouseDown={(e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            updateData("left");
          }}
          isDisabled={isDisabled}
        >
          <Tooltip id="LeftAlign" text="tooltips.studySet.toolbar.leftAlign">
            <Flex>
              <LeftAlignIcon size={iconSize} />{" "}
              <DropDownArrowIcon size={iconSize} rotate={ROTATE.NINETY} />
            </Flex>
          </Tooltip>
        </IconActive>
      </IconWrapper>

      <IconActive
        backgroundColor={
          backgroundColor || theme.colors.backgrounds.pageBackground
        }
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
        backgroundColor={
          backgroundColor || theme.colors.backgrounds.pageBackground
        }
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

      {blockOptionsModal ? (
        <StudySetToolbarModal
          editorState={editorState}
          setEditorState={setEditorState}
          coords={coords}
          open={blockOptionsModal}
          handleClose={() => setBlockOptionsModal(false)}
        />
      ) : null}
    </>
  );
};

export default ChangeTextAlignmentVertical;
