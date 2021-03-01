import React from "react";
import { useTheme } from "react-jss";
import { FILETREE_TYPES } from "../../../contexts/FileTreeContext";
import { ThemeType } from "../../../theme";
import { HFlex, Text } from "../../common";

interface SidebarEmptyBlockProps {
  type: string;
}

const SidebarEmptyBlock: React.FC<SidebarEmptyBlockProps> = ({ type }) => {
  const theme: ThemeType = useTheme();
  const paddingLeft =
    type === FILETREE_TYPES.FOLDER
      ? "40px"
      : type === FILETREE_TYPES.BINDER
      ? "48px"
      : null;

  const message =
    type === FILETREE_TYPES.FOLDER
      ? "No binders inside"
      : type === FILETREE_TYPES.BINDER
      ? "No study sets inside"
      : null;

  return (
    <HFlex padding={`0px 12px 8px ${paddingLeft}`}>
      <Text fontColor={theme.colors.grey1}>{message}</Text>
    </HFlex>
  );
};

export default SidebarEmptyBlock;
