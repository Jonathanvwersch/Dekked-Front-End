import React from "react";
import { Card, Flex, Text } from "../../../common";
import { usePageSetupHelpers } from "../../../../hooks";
import { FILETREE_TYPES } from "../../../../shared";

interface SidebarEmptyBlockProps {
  type: string;
}

const SidebarEmptyBlock: React.FC<SidebarEmptyBlockProps> = ({ type }) => {
  const { theme, formatMessage } = usePageSetupHelpers();

  const paddingLeft = () => {
    if (type === FILETREE_TYPES.FOLDER) return theme.spacers.size40;
    else return theme.spacers.size48;
  };

  const message = () => {
    if (type === FILETREE_TYPES.FOLDER) return "sidebar.block.noBinders";
    else return "sidebar.block.noStudySets";
  };

  return (
    <Card
      padding={`${theme.spacers.size4} ${theme.spacers.size12} ${
        theme.spacers.size8
      } ${paddingLeft()}`}
    >
      <Flex>
        <Text fontColor={theme.colors.grey1}>{formatMessage(message())}</Text>
      </Flex>
    </Card>
  );
};

export default SidebarEmptyBlock;
