import React, { useContext } from "react";
import { IconDropdown, Tooltip } from "../../common";
import {
  IconActive,
  Spacer,
  CenterAlignIcon,
  LeftAlignIcon,
  RightAlignIcon,
} from "dekked-design-system";
import { ThemeContext } from "styled-components";
import { SIZES } from "../../../shared";
import {
  getCurrentBlock,
  removeSpecificBlockStyle,
  updateDataOfBlock,
} from "../../notetaking/Editor/Editor.helpers";
import { EditorState } from "draft-js";
import { AlignmentTypes, changeAlignmentData } from "./StudySetToolbar.helpers";
import { useResponsiveLayout } from "../../../hooks";
import { LAYOUT_HORIZONTAL } from "../../../hooks/useResponsiveLayout";

interface ChangeTextStyleProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  isDisabled?: boolean;
  iconSize?: SIZES;
  saveEditor?: (args: any) => void;
}

const ChangeTextStyles: React.FC<ChangeTextStyleProps> = ({
  editorState,
  setEditorState,
  isDisabled,
  iconSize = SIZES.MEDIUM,
  saveEditor,
}) => {
  const theme = useContext(ThemeContext);
  const block = getCurrentBlock(editorState);
  const data = block?.getData();
  const layout = useResponsiveLayout();

  // change alignment of block by updating meta state
  const updateData = (alignment: AlignmentTypes) => {
    const currentData = data.get("alignment");
    if (currentData !== alignment) {
      const newData = data.set("alignment", alignment);

      const newEditorState = updateDataOfBlock(
        removeSpecificBlockStyle(undefined, editorState, true),
        block,
        newData
      );
      setEditorState(newEditorState);
      saveEditor && saveEditor(newEditorState);
    }
  };

  return (
    <>
      {layout === LAYOUT_HORIZONTAL ? (
        <>
          <IconActive
            handleMouseDown={(e: MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              updateData(AlignmentTypes.LEFT_ALIGN);
            }}
            isDisabled={isDisabled}
          >
            <Tooltip id="LeftAlign" text="tooltips.studySet.toolbar.leftAlign">
              <LeftAlignIcon size={iconSize} />
            </Tooltip>
          </IconActive>
          <Spacer width={theme.spacers.size4} />
          <IconActive
            handleMouseDown={(e: MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              updateData(AlignmentTypes.CENTER_ALIGN);
            }}
            isDisabled={isDisabled}
          >
            <Tooltip
              id="CenterAlign"
              text="tooltips.studySet.toolbar.centerAlign"
            >
              <CenterAlignIcon size={iconSize} />
            </Tooltip>
          </IconActive>
          <Spacer width={theme.spacers.size4} />
          <IconActive
            handleMouseDown={(e: MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              updateData(AlignmentTypes.RIGHT_ALIGN);
            }}
            isDisabled={isDisabled}
          >
            <Tooltip
              id="RightAlign"
              text="tooltips.studySet.toolbar.rightAlign"
            >
              <RightAlignIcon size={iconSize} />
            </Tooltip>
          </IconActive>
        </>
      ) : (
        <IconDropdown
          tooltip={{
            id: "ChangeTextAlignment",
            text: "tooltips.studySet.toolbar.changeTextAlignment",
          }}
          modal={{
            height: theme.sizes.scrollerModal,
            data: changeAlignmentData,
            clickFunctions: updateData,
          }}
          icon={{
            icon: <LeftAlignIcon size={SIZES.MEDIUM} />,
          }}
        />
      )}
    </>
  );
};

export default ChangeTextStyles;
