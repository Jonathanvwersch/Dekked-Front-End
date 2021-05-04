import React, { memo, ReactElement, useContext, useState } from "react";
import styled from "styled-components";
import { MoveIcon, PlusIcon } from "../../../assets";
import { EditorContext } from "../../../contexts";
import { BLOCK_TYPES } from "../../../shared";
import { theme } from "../../../styles/theme";
import { IconActive, Spacer, Tooltip } from "../../common";
import { addNewBlockAt } from "../Editor/Editor.helpers";

interface BlockSettingsProps {
  blockKey: string;
  children?: ReactElement;
  blockType?: string;
}

const BlockSettings: React.FC<BlockSettingsProps> = ({
  children,
  blockKey,
  blockType,
}) => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const { editorState, setEditorState } = useContext(EditorContext);

  return (
    <Container
      onMouseOver={() => setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
      onMouseOut={() => setShowSettings(false)}
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
          <Tooltip id="AddNewBlock" text="tooltips.studySet.blocks.addBlocks">
            <PlusIcon color={theme.colors.grey1} />
          </Tooltip>
        </IconActive>
        <IconActive>
          <Tooltip
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

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
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
  right: ${({ blockType }) =>
    blockType === BLOCK_TYPES.NUMBERED_LIST ||
    blockType === BLOCK_TYPES.BULLETED_LIST
      ? "103%"
      : "100%"};
`;

export default memo(BlockSettings);
