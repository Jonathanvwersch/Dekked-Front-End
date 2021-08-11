import {
  DragBlock,
  IconActive,
  MoveIcon,
  PlusIcon,
  Spacer,
  Tooltip,
} from "dekked-design-system";
import { ContentBlock, EditorState } from "draft-js";
import React, { memo, ReactElement, useContext, useState } from "react";
import styled, { css, ThemeContext } from "styled-components";
import { BLOCK_TYPES } from "../../../shared";
import { addNewBlockAt, moveBlock } from "../Editor/Editor.helpers";
import { EditorType } from "../Editor/RichEditor";

interface BlockSettingsProps {
  blockKey: string;
  block: ContentBlock;
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  children: ReactElement;
  blockType: string;
  dragBlockKey: string | undefined;
  setDragBlockKey: React.Dispatch<React.SetStateAction<string | undefined>>;
  editorType: EditorType;
}

const BlockSettings: React.FC<BlockSettingsProps> = ({
  children,
  blockKey,
  blockType,
  editorState,
  setEditorState,
  dragBlockKey,
  setDragBlockKey,
  editorType,
}) => {
  const [isDraggable, setIsDraggable] = useState<boolean>(false);
  const [showDragStyles, setShowDragStyles] = useState<boolean>(false);
  const theme = useContext(ThemeContext);

  return (
    <StyledDragBlock
      isDraggable={isDraggable}
      dragStyles={css`
        padding-bottom: 4px;
        border-bottom: solid 2px ${({ theme }) => theme.colors.primary};
      `}
      handleDrop={() => {
        dragBlockKey &&
          setEditorState(moveBlock(editorState, blockKey, dragBlockKey));
        setShowDragStyles(false);
        setIsDraggable(false);
      }}
      handleDragEnd={() => setIsDraggable(false)}
      handleDragLeave={() => setShowDragStyles(false)}
      handleDragEnter={() => setShowDragStyles(true)}
      showDragStyles={showDragStyles}
    >
      <BlockHoverSettings
        blockType={blockType}
        contentEditable={false}
        editorType={editorType}
      >
        {editorType !== "flashcard" ? (
          <IconActive
            handleMouseDown={() => {
              setEditorState(addNewBlockAt(editorState, blockKey));
            }}
            tabIndex={-1}
          >
            <Tooltip
              id="AddNewBlock"
              text="tooltips.studySet.blocks.addBlocks"
              place="left"
            >
              <PlusIcon color={theme.colors.grey1} />
            </Tooltip>
          </IconActive>
        ) : null}
        <IconActive
          cursor={isDraggable ? "grabbing" : undefined}
          handleMouseDown={() => {
            // setIsDraggable(true);
            setDragBlockKey(blockKey);
          }}
          tabIndex={-1}
        >
          <Tooltip
            place="left"
            id="MoveBlock"
            text="tooltips.studySet.blocks.moveOrSettings"
          >
            <MoveIcon color={theme.colors.grey1} />
          </Tooltip>
        </IconActive>
        <Spacer
          width={
            blockType === BLOCK_TYPES.QUOTE
              ? "26px"
              : blockType === BLOCK_TYPES.NUMBERED_LIST ||
                blockType === BLOCK_TYPES.BULLETED_LIST
              ? "32px"
              : "8px"
          }
        />
      </BlockHoverSettings>
      {children}
    </StyledDragBlock>
  );
};

const leftPosition = (blockType: string, editorType: EditorType) => {
  if (editorType === "flashcard") {
    if (blockType === BLOCK_TYPES.QUOTE) {
      return "-42px";
    } else if (
      blockType === BLOCK_TYPES.NUMBERED_LIST ||
      blockType === BLOCK_TYPES.BULLETED_LIST
    ) {
      return "-45px";
    } else {
      return "-24px";
    }
  }
  if (blockType === BLOCK_TYPES.QUOTE) {
    return "-66px";
  } else if (
    blockType === BLOCK_TYPES.NUMBERED_LIST ||
    blockType === BLOCK_TYPES.BULLETED_LIST
  ) {
    return "-72px";
  } else {
    return "-48px";
  }
};

const BlockHoverSettings = styled.div<{
  blockType: string;
  editorType: EditorType;
}>`
  display: flex;
  opacity: 0;
  align-items: flex-start;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ blockType, editorType }) => leftPosition(blockType, editorType)};
`;

const StyledDragBlock = styled(DragBlock)`
  display: flex;
  align-items: flex-start;
  width: 100%;
  position: relative;
  &:hover {
    ${BlockHoverSettings} {
      opacity: 1;
    }
  }
`;

export default memo(BlockSettings);
