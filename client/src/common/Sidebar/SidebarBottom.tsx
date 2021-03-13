import React, { useContext } from "react";
import { Divider, HFlex, HoverCard, IconWrapper, Spacer, Text } from "..";

import styled, { ThemeContext } from "styled-components";
import { PlusIcon } from "../../assets";
import { FileTreeContext } from "../../contexts";
import { ThemeType } from "../../styles/theme";
import { FILETREE_TYPES } from "../../contexts/FileTreeContext";

interface SidebarBottomProps {}

const SidebarBottom: React.FC<SidebarBottomProps> = () => {
  const theme: ThemeType = useContext(ThemeContext);
  const { handleAddingAsset } = useContext(FileTreeContext);

  return (
    <StyledSidebarBottom>
      <Divider />
      <HoverCard
        handleClick={() => {
          handleAddingAsset(FILETREE_TYPES.FOLDER);
        }}
        padding="16px"
      >
        <HFlex>
          <IconWrapper>
            <PlusIcon size="20px" />
          </IconWrapper>
          <Spacer width={theme.spacers.size8} />
          <Text fontSize={theme.typography.fontSizes.size16}>Add folder</Text>
        </HFlex>
      </HoverCard>
    </StyledSidebarBottom>
  );
};

const StyledSidebarBottom = styled.div`
  height: 50px;
  z-index: 10;
  margin-top: auto;
  width: 100%;
`;

export default SidebarBottom;
