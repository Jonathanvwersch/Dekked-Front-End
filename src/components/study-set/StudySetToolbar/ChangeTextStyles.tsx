import React, { Fragment, useContext } from "react";
import { IconDropdown, Tooltip } from "../../common";
import { IconActive, Spacer, BoldIcon } from "dekked-design-system";

import { BLOCK_TYPES, SIZES, TEXT_STYLES } from "../../../shared";
import {
  doesBlockContainStyle,
  getCurrentBlock,
  removeSpecificBlockStyle,
  toggleInlineStyle,
} from "../../notetaking/Editor/Editor.helpers";
import { ThemeContext } from "styled-components";

import {
  changeBlockTypeIcons,
  changeTextStylesData,
} from "./StudySetToolbar.helpers";
import { EditorState, RichUtils } from "draft-js";
import { ConvertToBlockData } from "../../notetaking/TextModal/NotetakingBlocks.data";
import { useResponsiveLayout } from "../../../hooks";
import { LAYOUT_HORIZONTAL } from "../../../hooks/useResponsiveLayout";

interface ChangeTextStyleProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  headerRef?: React.RefObject<HTMLDivElement>;
  isDisabled?: boolean;
  saveEditor?: (args: any) => void;
  fullHeightBlockTypeModal?: boolean;
}

const ChangeTextStyles: React.FC<ChangeTextStyleProps> = ({
  editorState,
  setEditorState,
  isDisabled,
  saveEditor,
  fullHeightBlockTypeModal,
}) => {
  const theme = useContext(ThemeContext);
  const stylesToRemoveScripts = [
    TEXT_STYLES.SUBSCRIPT,
    TEXT_STYLES.SUPERSCRIPT,
  ];

  const layout = useResponsiveLayout();

  const currentBlockType =
    getCurrentBlock(editorState)?.getType() || "unstyled";

  const changeBlockTypes = (type: BLOCK_TYPES) => {
    // only change block type if user chooses option other than current block type
    if (getCurrentBlock(editorState).getType() !== type) {
      const newEditorState = RichUtils.toggleBlockType(editorState, type);
      setEditorState(newEditorState);
      saveEditor && saveEditor(newEditorState);
    }
  };

  const changeTextStyles = (textStyle: TEXT_STYLES) => {
    if (
      textStyle === TEXT_STYLES.SUBSCRIPT ||
      textStyle === TEXT_STYLES.SUPERSCRIPT
    ) {
      const oppositeStyle =
        textStyle === TEXT_STYLES.SUBSCRIPT
          ? TEXT_STYLES.SUPERSCRIPT
          : TEXT_STYLES.SUBSCRIPT;
      if (doesBlockContainStyle(editorState, textStyle)) {
        const newEditorState = removeSpecificBlockStyle(
          [textStyle],
          editorState
        );
        setEditorState(removeSpecificBlockStyle([textStyle], editorState));
        saveEditor && saveEditor(newEditorState);
      } else {
        const newEditorState = toggleInlineStyle(
          removeSpecificBlockStyle([oppositeStyle], editorState),
          textStyle,
          stylesToRemoveScripts
        );

        setEditorState(newEditorState);
        saveEditor && saveEditor(newEditorState);
      }
    } else if (textStyle === TEXT_STYLES.REMOVE_FORMATTING) {
      const newEditorState = removeSpecificBlockStyle(
        undefined,
        editorState,
        true
      );
      setEditorState(newEditorState);
      saveEditor && saveEditor(newEditorState);
    } else {
      const newEditorState = toggleInlineStyle(editorState, textStyle);
      setEditorState(toggleInlineStyle(editorState, textStyle));
      saveEditor && saveEditor(newEditorState);
    }
  };

  return (
    <>
      <IconDropdown
        tooltip={{
          id: changeBlockTypeIcons(currentBlockType).id,
          text: changeBlockTypeIcons(currentBlockType).text,
        }}
        modal={{
          height: theme.sizes.scrollerModal,
          data: ConvertToBlockData,
          clickFunctions: changeBlockTypes,
        }}
        icon={{
          icon: changeBlockTypeIcons(currentBlockType).icon,
          size: SIZES.MEDIUM,
        }}
        id="ChangeTextStyles"
        fullHeightDropdownModal={fullHeightBlockTypeModal}
      />
      {layout === LAYOUT_HORIZONTAL ? (
        <>
          <Spacer width={theme.spacers.size4} />
          {changeTextStylesData.map((textStyleData) => (
            <Fragment key={textStyleData.id}>
              <IconActive
                handleMouseDown={(e: MouseEvent) => {
                  e.preventDefault();
                  e.stopPropagation();
                  changeTextStyles(textStyleData.value);
                }}
                isDisabled={isDisabled}
              >
                <Tooltip id={textStyleData.id || ""} text={textStyleData.label}>
                  {textStyleData.icon}
                </Tooltip>
              </IconActive>
              <Spacer width={theme.spacers.size4} />
            </Fragment>
          ))}
        </>
      ) : (
        <IconDropdown
          tooltip={{
            id: "ChangeTextStyle",
            text: "tooltips.studySet.toolbar.changeTextStyles",
          }}
          modal={{
            height: theme.sizes.scrollerModal,
            data: changeTextStylesData,
            clickFunctions: changeTextStyles,
          }}
          icon={{
            icon: <BoldIcon size={SIZES.MEDIUM} />,
          }}
        />
      )}
    </>
  );
};

export default ChangeTextStyles;
