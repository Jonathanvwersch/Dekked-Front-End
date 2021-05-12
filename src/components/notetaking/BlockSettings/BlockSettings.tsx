import { ContentBlock } from "draft-js";
import React, { memo, ReactElement, useContext, useState } from "react";
import styled, { css } from "styled-components";
import { MoveIcon, PlusIcon } from "../../../assets";
import { EditorContext } from "../../../contexts";
import { BLOCK_TYPES } from "../../../shared";
import { theme } from "../../../styles/theme";
import { DragBlock, IconActive, Spacer, Tooltip } from "../../common";
import { addNewBlockAt, moveBlock } from "../Editor/Editor.helpers";

interface BlockSettingsProps {
  blockKey: string;
  block: ContentBlock;
  children?: ReactElement;
  blockType?: string;
}

const BlockSettings: React.FC<BlockSettingsProps> = ({
  children,
  blockKey,
  blockType,
}) => {
  const [isDraggable, setIsDraggable] = useState<boolean>(false);
  const [showDragStyles, setShowDragStyles] = useState<boolean>(false);

  const {
    editorState,
    setEditorState,
    setDragBlockKey,
    dragBlockKey,
  } = useContext(EditorContext);

  return (
    <StyledDragBlock
      isDraggable={isDraggable}
      dragStyles={css`
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
      <BlockHoverSettings blockType={blockType} contentEditable={false}>
        <IconActive
          handleMouseDown={() => {
            setEditorState(addNewBlockAt(editorState, blockKey));
          }}
        >
          <Tooltip
            id="AddNewBlock"
            text="tooltips.studySet.blocks.addBlocks"
            place="left"
          >
            <PlusIcon color={theme.colors.grey1} />
          </Tooltip>
        </IconActive>
        <IconActive
          cursor={isDraggable ? "grabbing" : undefined}
          handleMouseDown={() => {
            setIsDraggable(true);
            setDragBlockKey(blockKey);
          }}
        >
          <Tooltip
            place="left"
            id="BlockSettingsAndMove"
            text="tooltips.studySet.blocks.moveOrSettings"
          >
            <MoveIcon color={theme.colors.grey1} />
          </Tooltip>
        </IconActive>
        <Spacer width={theme.spacers.size8} />
      </BlockHoverSettings>
      {children}
    </StyledDragBlock>
  );
};

const BlockHoverSettings = styled.div<{
  blockType?: string;
}>`
  display: flex;
  opacity: 0;
  align-items: flex-start;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ blockType }) =>
    blockType === BLOCK_TYPES.QUOTE
      ? "-66px"
      : blockType === BLOCK_TYPES.NUMBERED_LIST ||
        blockType === BLOCK_TYPES.BULLETED_LIST
      ? "-72px"
      : "-48px"};
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
