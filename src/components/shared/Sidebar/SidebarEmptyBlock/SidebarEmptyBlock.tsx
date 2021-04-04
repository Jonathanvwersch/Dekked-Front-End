import React from "react";
import { ThemeContext } from "styled-components";
import { Card, HFlex, Text } from "../../../common";
import { usePageSetupHelpers } from "../../../../hooks";
import { useIntl } from "react-intl";
import { FILETREE_TYPES } from "../../../../shared";

interface SidebarEmptyBlockProps {
  type: string;
}

const SidebarEmptyBlock: React.FC<SidebarEmptyBlockProps> = ({ type }) => {
  const intl = useIntl();
  const { theme, formatMessage } = usePageSetupHelpers(ThemeContext, intl);

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
      <HFlex>
        <Text fontColor={theme.colors.grey1}>{formatMessage(message())}</Text>
      </HFlex>
    </Card>
  );
};

export default SidebarEmptyBlock;
