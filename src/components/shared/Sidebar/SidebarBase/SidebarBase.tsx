import React, { memo, useContext } from "react";
import { Divider, Flex, HoverCard, Spacer, Text } from "../../../common";
import styled, { ThemeContext } from "styled-components";
import { PlusIcon } from "../../../../assets";
import { FileTreeContext } from "../../../../contexts";
import { FILETREE_TYPES, SIZES } from "../../../../shared";
import { FormattedMessage } from "react-intl";

interface SidebarBaseProps {
  scrollToBottom: () => void;
}

const SidebarBase: React.FC<SidebarBaseProps> = ({ scrollToBottom }) => {
  const theme = useContext(ThemeContext);
  const { addAsset } = useContext(FileTreeContext);

  return (
    <StyledSidebarBase>
      <Divider />
      <HoverCard
        handleMouseDown={() => {
          addAsset(FILETREE_TYPES.FOLDER);
          scrollToBottom();
        }}
        padding={theme.spacers.size16}
      >
        <Flex>
          <PlusIcon size={SIZES.MEDIUM} />
          <Spacer width={theme.spacers.size8} />
          <Text fontSize={theme.typography.fontSizes.size16}>
            <FormattedMessage id="sidebar.base.addFolder" />
          </Text>
        </Flex>
      </HoverCard>
    </StyledSidebarBase>
  );
};

const StyledSidebarBase = styled.div`
  z-index: 10;
  margin-top: auto;
  width: 100%;
`;

export default memo(SidebarBase);
