import React from "react";
import { DotsMenuIcon, DropDownArrowIcon, FolderIcon } from "../../assets";
import HorizontalFlexContainer from "../common/HorizontalFlexContainer/HorizontalFlexContainer";
import IconActive from "../common/IconActive/IconActive";
import IconWrapper from "../common/IconWrapper/IconWrapper";
import Spacer from "../common/Spacer/Spacer";
import Text from "../common/Text/Text";

interface SidebarBlockProps {}

const SidebarBlock: React.FC<SidebarBlockProps> = () => {
  return (
    <HorizontalFlexContainer justifyContent="space-between" padding="8px 16px">
      <HorizontalFlexContainer padding="0px">
        <IconActive>
          <DropDownArrowIcon />
        </IconActive>
        <Spacer width="8px" />
        <IconWrapper>
          <FolderIcon />
        </IconWrapper>
        <Spacer width="8px" />
        <Text>Welcome to Dekked</Text>
      </HorizontalFlexContainer>
      <IconActive>
        <DotsMenuIcon />
      </IconActive>
    </HorizontalFlexContainer>
  );
};

export default SidebarBlock;
