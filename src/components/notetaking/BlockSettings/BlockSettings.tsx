import React, { memo, useState } from "react";
import styled from "styled-components";
import { MoveIcon, PlusIcon } from "../../../assets";
import { theme } from "../../../styles/theme";
import { IconActive, Spacer, Tooltip } from "../../common";

interface BlockSettingsProps {}

const BlockSettings: React.FC<BlockSettingsProps> = ({ children }) => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  return (
    <div
      onMouseOver={() => setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
      onMouseOut={() => setShowSettings(false)}
    >
      <BlockHoverSettings
        showSettings={showSettings}
        onMouseOver={() => setShowSettings(true)}
      >
        <IconActive>
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
    </div>
  );
};

const BlockHoverSettings = styled.span<{ showSettings: boolean }>`
  opacity: ${({ showSettings }) => (showSettings ? 1 : 0)};
  display: flex;
  height: 100%;
  align-items: flex-start;
  position: absolute;
  left: -44px;
  margin-top: 2px;
`;

export default memo(BlockSettings);
