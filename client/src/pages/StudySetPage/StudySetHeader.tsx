import React, { useContext } from "react";
import { PageHeader } from "../shared";
import { HFlex, Spacer, Toolbar, VFlex } from "../../common";
import { FILETREE_TYPES } from "../../contexts/FileTreeContext";
import { SelectedItemContext } from "../../contexts/SelectedItemContext";
import StudySetTabs from "./StudySetTabs";

interface StudySetHeaderProps {}

const StudySetHeader: React.FC<StudySetHeaderProps> = () => {
  const { selectedItemData } = useContext(SelectedItemContext);

  return (
    <VFlex>
      <HFlex justifyContent="space-between">
        <Toolbar />
        <StudySetTabs />
      </HFlex>
      <Spacer height="32px" />
      <PageHeader type={FILETREE_TYPES.STUDY_SET} id={selectedItemData?.id!} />
    </VFlex>
  );
};

export default StudySetHeader;
