import React, { useContext } from "react";
import {
  Divider,
  HFlex,
  HoverCard,
  IconWrapper,
  Spacer,
  Text,
} from "../../../common";
import styled, { ThemeContext } from "styled-components";
import { PlusIcon } from "../../../../assets";
import { FileTreeContext } from "../../../../contexts";
import { ThemeType } from "../../../../styles/theme";
import { FILETREE_TYPES, SIZES } from "../../../../shared";

interface SidebarBaseProps {
  scrollToBottom: () => void;
}

const SidebarBase: React.FC<SidebarBaseProps> = ({ scrollToBottom }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const { handleAddingAsset } = useContext(FileTreeContext);

  return (
    <StyledSidebarBase>
      <Divider />
      <HoverCard
        handleMouseDown={() => {
          handleAddingAsset(FILETREE_TYPES.FOLDER);
          scrollToBottom();
        }}
        padding={theme.spacers.size16}
      >
        <HFlex>
          <IconWrapper>
            <PlusIcon size={SIZES.MEDIUM} />
          </IconWrapper>
          <Spacer width={theme.spacers.size8} />
          <Text fontSize={theme.typography.fontSizes.size16}>Add folder</Text>
        </HFlex>
      </HoverCard>
    </StyledSidebarBase>
  );
};

const StyledSidebarBase = styled.div`
  z-index: 10;
  margin-top: auto;
  width: 100%;
`;

export default SidebarBase;
