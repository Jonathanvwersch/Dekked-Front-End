import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Card, HFlex, Text } from "../../../common";
import { FILETREE_TYPES } from "../../../../contexts/FileTreeContext";
import { ThemeType } from "../../../../styles/theme";

interface EmptyBlockProps {
  type: string;
}

const EmptyBlock: React.FC<EmptyBlockProps> = ({ type }) => {
  const theme: ThemeType = useContext(ThemeContext);

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
    <Card padding={`4px 12px 8px ${paddingLeft}`}>
      <HFlex>
        <Text fontColor={theme.colors.grey1}>{message}</Text>
      </HFlex>
    </Card>
  );
};

export default EmptyBlock;
