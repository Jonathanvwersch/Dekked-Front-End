import React, { Fragment, useContext } from "react";
import { IconDropdown } from "../../common";
import { IconActive, Spacer, Tooltip, BoldIcon } from "dekked-design-system";

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
}

const ChangeTextStyles: React.FC<ChangeTextStyleProps> = ({
  editorState,
  setEditorState,
  isDisabled,
}) => {
  const theme = useContext(ThemeContext);
  const stylesToRemoveScripts = [
    TEXT_STYLES.SUBSCRIPT,
    TEXT_STYLES.SUPERSCRIPT,
  ];

  const layout = useResponsiveLayout();

  const currentBlockType = getCurrentBlock(editorState).getType() || "unstyled";

  const changeBlockTypes = (type: BLOCK_TYPES) => {
    // only change block type if user chooses option other than current block type
    if (getCurrentBlock(editorState).getType() !== type) {
      setEditorState(RichUtils.toggleBlockType(editorState, type));
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
      doesBlockContainStyle(editorState, textStyle)
        ? setEditorState(removeSpecificBlockStyle([textStyle], editorState))
        : setEditorState(
            toggleInlineStyle(
              removeSpecificBlockStyle([oppositeStyle], editorState),
              textStyle,
              stylesToRemoveScripts
            )
          );
    } else if (textStyle === TEXT_STYLES.REMOVE_FORMATTING) {
      setEditorState(removeSpecificBlockStyle(undefined, editorState, true));
    } else {
      setEditorState(toggleInlineStyle(editorState, textStyle));
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
