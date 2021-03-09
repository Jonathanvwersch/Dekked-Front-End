import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { PageHeader } from ".";
import { HFlex, VFlex, Text, Spacer } from "../../components/common";
import { SelectedItemContext } from "../../contexts/SelectedItemContext";
import { handleUntitled } from "../../helpers/handleUntitled";
import { ThemeType } from "../../styles/theme";

interface FolderBinderHeaderProps {}

const FolderBinderHeader: React.FC<FolderBinderHeaderProps> = () => {
  const theme: ThemeType = useContext(ThemeContext);
  const { selectedItemData } = useContext(SelectedItemContext);

  return (
    <VFlex>
      <HFlex>
        <PageHeader>{handleUntitled(selectedItemData?.name!)}</PageHeader>
      </HFlex>
      <Spacer height="16px" />
      <HFlex justifyContent="space-between">
        <Text fontColor={theme.colors.grey1}> studyset</Text>
      </HFlex>
      <Spacer height="32px" />
    </VFlex>
  );
};

export default FolderBinderHeader;
