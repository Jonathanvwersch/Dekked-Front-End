import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Card, HFlex, Text } from "../../../common";
import { ThemeType } from "../../../../styles/theme";
import { FILETREE_TYPES } from "../../../../shared";

interface SidebarEmptyBlockProps {
  type: string;
}

const SidebarEmptyBlock: React.FC<SidebarEmptyBlockProps> = ({ type }) => {
  const theme: ThemeType = useContext(ThemeContext);

  const paddingLeft =
    type === FILETREE_TYPES.FOLDER
      ? theme.spacers.size40
      : type === FILETREE_TYPES.BINDER
      ? theme.spacers.size48
      : null;

  const message =
    type === FILETREE_TYPES.FOLDER
      ? "No binders inside"
      : type === FILETREE_TYPES.BINDER
      ? "No study sets inside"
      : null;

  return (
    <Card
      padding={`${theme.spacers.size4} ${theme.spacers.size12} ${theme.spacers.size8} ${paddingLeft}`}
    >
      <HFlex>
        <Text fontColor={theme.colors.grey1}>{message}</Text>
      </HFlex>
    </Card>
  );
};

export default SidebarEmptyBlock;
