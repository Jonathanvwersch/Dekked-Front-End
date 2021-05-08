import { ContentBlock } from "draft-js";
import React, { memo, ReactElement, useContext, useState } from "react";
import styled, { css } from "styled-components";
import { MoveIcon, PlusIcon } from "../../../assets";
import { EditorContext } from "../../../contexts";
import { BLOCK_TYPES } from "../../../shared";
import { theme } from "../../../styles/theme";
import { IconActive, Spacer, Tooltip } from "../../common";
import {
  addNewBlockAt,
  moveBlock,
  removeBlock,
} from "../Editor/Editor.helpers";

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
  block,
}) => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isDraggable, setIsDraggable] = useState<boolean>(false);
  const [dragStyles, setDragStyles] = useState<boolean>(false);
  const [keyOfBlockBeingHoveredOver, setKeyOfBlockBeingHoveredOver] = useState<
    string | undefined
  >();

  const { editorState, setEditorState } = useContext(EditorContext);

  return (
    <Container
      onMouseOver={() => setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
      onMouseOut={() => setShowSettings(false)}
      draggable={isDraggable}
      onDragEnter={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragStyles(true);
        setKeyOfBlockBeingHoveredOver(blockKey);
      }}
      onDragLeave={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragStyles(false);
      }}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragEnd={() => setIsDraggable(false)}
      onDrop={() => {
        keyOfBlockBeingHoveredOver &&
          setEditorState(removeBlock(block, editorState));
        setDragStyles(false);
        setIsDraggable(false);
      }}
      dragStyles={dragStyles}
    >
      <BlockHoverSettings
        blockType={blockType}
        showSettings={showSettings}
        onMouseOver={() => setShowSettings(true)}
        contentEditable={false}
      >
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
    </Container>
  );
};

const Container = styled.div<{ dragStyles: boolean }>`
  display: flex;
  align-items: flex-start;
  width: 100%;
  ${({ dragStyles }) => dragStyles && dragOverStyles}
`;

const dragOverStyles = css`
  border-bottom: solid 2px ${({ theme }) => theme.colors.primary};
`;

const BlockHoverSettings = styled.div<{
  showSettings: boolean;
  blockType?: string;
}>`
  opacity: ${({ showSettings }) => (showSettings ? 1 : 0)};
  display: flex;
  height: ${({ theme }) => theme.spacers.size20};
  align-items: center;
  position: absolute;
  left: ${({ blockType }) =>
    blockType === BLOCK_TYPES.NUMBERED_LIST ||
    blockType === BLOCK_TYPES.BULLETED_LIST
      ? "-72px"
      : "-48px"};
`;

export default memo(BlockSettings);
